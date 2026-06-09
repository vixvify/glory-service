import {
  CreateMovieBodyDTO,
  UpdateMovieBodyDTO,
} from "../../modules/movies/domain/movie";

export function extractCrewInput(dto: CreateMovieBodyDTO | UpdateMovieBodyDTO) {
  return {
    directors: dto.director ?? [],
    producers: dto.producer ?? [],
    writers: dto.writer ?? [],
    cast: dto.cast ?? [],
    dops: dto.dop ?? [],
    editors: dto.editor ?? [],
    btsVideos: dto.btsVideo ?? [],
  };
}
