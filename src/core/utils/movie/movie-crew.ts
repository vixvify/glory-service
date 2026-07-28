import {
  CreateMovieBodyDTO,
  UpdateMovieBodyDTO,
} from "../../../modules/movies/domain/movie";
import { MovieCrewInputItemWithRole } from "../../../modules/movies/parser";

export function extractCrewInput(dto: CreateMovieBodyDTO | UpdateMovieBodyDTO) {
  const crew: MovieCrewInputItemWithRole[] = [];

  if (dto.crew && Array.isArray(dto.crew)) {
    crew.push(...(dto.crew as MovieCrewInputItemWithRole[]));
  }

  return {
    crew,
    btsVideos: dto.btsVideo ?? [],
  };
}
