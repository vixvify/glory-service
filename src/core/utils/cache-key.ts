import { MovieFilterInput } from "../../modules/movies/domain/movie";

export class CacheKeys {
  static movieListDefault() {
    return "movie:list:default";
  }

  static movieListWildcard() {
    return "movie:list:*";
  }

  static movieList(input: MovieFilterInput) {
    return [
      "movie:list",
      input.search ?? "",
      input.searchby ?? "",
      input.page ?? 1,
      input.pagesize ?? "",
      input.sort ?? "",
      input.sortby ?? "",
    ].join(":");
  }

  static movieDetail(id: string) {
    return `movie:${id}`;
  }
}
