import { UrlRepositoryKysely } from "@/repositories/kysely/url-repository-kysely";
import { ShortenerUrlUseCase } from "../shortener-url";

export function makeShortenerUrlFactory() {
  const urlRepository = new UrlRepositoryKysely();
  const shortenerUrlUseCase = new ShortenerUrlUseCase(urlRepository);

  return shortenerUrlUseCase;
}
