import type { Url } from "@/infra/db/types/db";
import { UrlRepositoryInMemory } from "@/repositories/in-memory/url-repository-in-memory";
import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import type { UserRepository } from "@/repositories/user-repository";
import type { Selectable } from "kysely";
import { beforeEach, describe, expect, it } from "vitest";
import { GetShortedUrlUseCase } from ".";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { ShortenerUrlUseCase } from "../shortener-url";

describe("Get shorted url use case", () => {
  let urlRepository: UrlRepositoryInMemory;
  let shortenerUrlUseCase: ShortenerUrlUseCase;
  let userRepository: UserRepository;
  let sut: GetShortedUrlUseCase;
  let url: Selectable<Url> | undefined;

  const origUrl = "https://www.google.com/";

  beforeEach(async () => {
    urlRepository = new UrlRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();
    shortenerUrlUseCase = new ShortenerUrlUseCase(urlRepository, userRepository);
    sut = new GetShortedUrlUseCase(urlRepository);

    url = await shortenerUrlUseCase.execute({
      origUrl,
      userId: null,
    });
  });

  it("should be can GET a shorted url", async () => {
    const shortedUrl = await sut.execute({
      urlId: url?.urlId ?? "",
    });
    expect(shortedUrl.origUrl).toEqual(origUrl);
  });

  it("should be NOT get a shorted url with wrong urlId", async () => {
    expect(
      sut.execute({
        urlId: "WRONG URL ID",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
