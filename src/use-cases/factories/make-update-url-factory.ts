import { UrlRepositoryKysely } from "@/repositories/kysely/url-repository-kysely";
import { UserRepositoryKysely } from "@/repositories/kysely/user-repository-kysely";
import { UpdateUrlUseCase } from "../update-url";

export function makeUpdateUrlFactory() {
  const userRepository = new UserRepositoryKysely();
  const urlRepository = new UrlRepositoryKysely();
  const updateUrlUseCase = new UpdateUrlUseCase(urlRepository, userRepository);

  return updateUrlUseCase;
}
