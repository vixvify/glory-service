import { ratingService, movieService } from "./src/lib/container";
import { prisma } from "./src/lib/prisma";

async function main() {
  let movieAId: string | undefined;
  let movieBId: string | undefined;
  let defaultUserId: string | undefined;

  try {
    console.log("Starting service-level sorting verification...");

    // 1. Get first 2 movies
    const movies = await prisma.movie.findMany({ take: 2 });
    if (movies.length < 2) {
      console.log("Not enough movies in the DB to test rating sort.");
      return;
    }
    movieAId = movies[0].id;
    movieBId = movies[1].id;

    // Find system user
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log("No user found to associate ratings.");
      return;
    }
    defaultUserId = user.id;

    // Clean up any existing ratings first
    await ratingService.deleteRating(defaultUserId, movieAId).catch(() => {});
    await ratingService.deleteRating(defaultUserId, movieBId).catch(() => {});

    // Create rating 5 stars for Movie A, 1 star for Movie B
    console.log(`Adding 5 stars rating for Movie A ("${movies[0].title}")...`);
    await ratingService.addRating({
      userId: defaultUserId,
      movieId: movieAId,
      stars: 5,
      comment: "Superb!",
    });

    console.log(`Adding 1 star rating for Movie B ("${movies[1].title}")...`);
    await ratingService.addRating({
      userId: defaultUserId,
      movieId: movieBId,
      stars: 1,
      comment: "Okay.",
    });

    // Check movie averageRating column in the database directly
    const updatedMovieA = await prisma.movie.findUnique({ where: { id: movieAId } });
    const updatedMovieB = await prisma.movie.findUnique({ where: { id: movieBId } });
    console.log(`Movie A averageRating: ${updatedMovieA?.averageRating}`);
    console.log(`Movie B averageRating: ${updatedMovieB?.averageRating}`);

    console.log("\n--- DESCENDING TEST (averageRating) ---");
    const moviesDesc = await movieService.getMovies({
      sortby: "averageRating",
      sort: "desc",
      page: "1",
      pagesize: "5",
    });

    for (const m of moviesDesc) {
      console.log(`- "${m.title}", averageRating: ${m.averageRating} (loaded ratings count: ${m.ratings.length})`);
    }

    console.log("\nUpdating Movie B rating to 5 stars...");
    await ratingService.updateRating({
      userId: defaultUserId,
      movieId: movieBId,
      stars: 5,
    });

    const updatedMovieB2 = await prisma.movie.findUnique({ where: { id: movieBId } });
    console.log(`Movie B new averageRating: ${updatedMovieB2?.averageRating}`);

    console.log("\n--- DESCENDING TEST AFTER UPDATE (averageRating) ---");
    const moviesDescAfter = await movieService.getMovies({
      sortby: "averageRating",
      sort: "desc",
      page: "1",
      pagesize: "5",
    });

    for (const m of moviesDescAfter) {
      console.log(`- "${m.title}", averageRating: ${m.averageRating} (loaded ratings count: ${m.ratings.length})`);
    }

  } catch (error) {
    console.error("Service test failed:", error);
  } finally {
    // Clean up
    if (movieAId && movieBId && defaultUserId) {
      console.log("\nCleaning up ratings...");
      await ratingService.deleteRating(defaultUserId, movieAId).catch(() => {});
      await ratingService.deleteRating(defaultUserId, movieBId).catch(() => {});
    }
    await prisma.$disconnect();
  }
}

main();
