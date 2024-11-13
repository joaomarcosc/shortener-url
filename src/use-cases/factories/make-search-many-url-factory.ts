import { UrlRepositoryKysely } from "@/repositories/kysely/url-repository-kysely";
import { UserRepositoryKysely } from "@/repositories/kysely/user-repository-kysely";
import { SearchManyUrlUseCase } from "../search-many-urls";

export function makeSearchManyUrlFactory() {
  const userRepository = new UserRepositoryKysely();
  const urlRepository = new UrlRepositoryKysely();
  const searchManyUrlUseCase = new SearchManyUrlUseCase(urlRepository, userRepository);

  return searchManyUrlUseCase;
}
