import { UrlRepositoryInMemory } from "@/repositories/in-memory/url-repository-in-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { ShortenerUrlUseCase } from ".";
import { ShortWrongUrlError } from "../errors/short-wrong-url-error";

describe("Url Shortener use case", () => {
  let urlRepository: UrlRepositoryInMemory;
  let sut: ShortenerUrlUseCase;

  beforeEach(async () => {
    urlRepository = new UrlRepositoryInMemory();
    sut = new ShortenerUrlUseCase(urlRepository);
  });

  it("should be can short a url", async () => {
    const url = await sut.execute({
      origUrl: "https://goglassbr.com/seminovos/",
    });

    expect(url?.shortUrl).toEqual(expect.any(String));
  });

  it("should not be able to short a url when use incorrect origUrl", async () => {
    expect(
      sut.execute({
        origUrl: "oi, sou um teste",
      }),
    ).rejects.toBeInstanceOf(ShortWrongUrlError);
  });
});
