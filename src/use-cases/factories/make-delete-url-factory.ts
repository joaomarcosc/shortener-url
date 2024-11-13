import { UrlRepositoryKysely } from "@/repositories/kysely/url-repository-kysely";
import { UserRepositoryKysely } from "@/repositories/kysely/user-repository-kysely";
import { DeleteUrlUseCase } from "../delete-url";

export function makeDeleteUrlFactory() {
  const urlRepository = new UrlRepositoryKysely();
  const userRepository = new UserRepositoryKysely();
  const deleteUrlUseCase = new DeleteUrlUseCase(urlRepository, userRepository);

  return deleteUrlUseCase;
}
