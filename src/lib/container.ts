import { AuthRepositoryImpl } from "../infrastructure/auth.repository";
import { MovieRepositoryImpl } from "../infrastructure/movie.repository";
import { CrewMemberRepositoryImpl } from "../infrastructure/crew-member.repository";
import { RatingRepositoryImpl } from "../infrastructure/rating.repository";
import { FavoriteRepositoryImpl } from "../infrastructure/favorite.repository";
import { MasterDataRepositoryImpl } from "../infrastructure/masterdata.repository";
import { MovieCrewRepositoryImpl } from "../infrastructure/movie-crew.repository";

import { AuthService } from "../modules/auth/service";
import { MovieService } from "../modules/movies/service";
import { CrewMemberService } from "../modules/crew-members/service";
import { RatingService } from "../modules/ratings/service";
import { FavoriteService } from "../modules/favorites/service";
import { MasterDataService } from "../modules/master-data/service";

export const authRepo = new AuthRepositoryImpl();
export const movieRepo = new MovieRepositoryImpl();
export const crewMemberRepo = new CrewMemberRepositoryImpl();
export const movieCrewRepo = new MovieCrewRepositoryImpl();
export const ratingRepo = new RatingRepositoryImpl();
export const favoriteRepo = new FavoriteRepositoryImpl();
export const masterDataRepo = new MasterDataRepositoryImpl();

export const authService = new AuthService(authRepo, crewMemberRepo);
export const movieService = new MovieService(movieRepo, crewMemberRepo, movieCrewRepo, authRepo);
export const crewMemberService = new CrewMemberService(crewMemberRepo, authRepo);
export const ratingService = new RatingService(ratingRepo);
export const favoriteService = new FavoriteService(favoriteRepo, movieRepo);
export const masterDataService = new MasterDataService(masterDataRepo);
