import { UrlRepositoryKysely } from "@/repositories/kysely/url-repository-kysely";
import { UserRepositoryKysely } from "@/repositories/kysely/user-repository-kysely";
import { ShortenerUrlUseCase } from "../shortener-url";

export function makeShortenerUrlFactory() {
  const urlRepository = new UrlRepositoryKysely();
  const userRepository = new UserRepositoryKysely();
  const shortenerUrlUseCase = new ShortenerUrlUseCase(urlRepository, userRepository);

  return shortenerUrlUseCase;
}
