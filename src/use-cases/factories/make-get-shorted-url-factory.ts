import { UrlRepositoryKysely } from "@/repositories/kysely/url-repository-kysely";
import { GetShortedUrlUseCase } from "../get-shorted-url";

export function makeGetShortedUrlFactory() {
  const urlRepository = new UrlRepositoryKysely();
  const getShortedUrlUseCase = new GetShortedUrlUseCase(urlRepository);

  return getShortedUrlUseCase;
}
