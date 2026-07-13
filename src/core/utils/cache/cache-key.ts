import { MovieFilterInput } from "../../../modules/movies/domain/movie";
import { CrewFilterInput } from "../../../modules/crew-members/domain/crew-member";

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
      input.aspectRatio ?? "",
    ].join(":");
  }

  static movieDetail(id: string) {
    return `movie:${id}`;
  }

  static crewListDefault() {
    return "crew:list:default";
  }

  static crewListWildcard() {
    return "crew:list:*";
  }

  static crewList(input: CrewFilterInput) {
    return [
      "crew:list",
      input.search ?? "",
      input.searchby ?? "",
      input.page ?? 1,
      input.pagesize ?? "",
      input.sort ?? "",
      input.sortby ?? "",
    ].join(":");
  }

  static crewDetail(id: string) {
    return `crew:detail:${id}`;
  }
}
