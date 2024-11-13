import { UrlRepositoryInMemory } from "@/repositories/in-memory/url-repository-in-memory";
import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import type { UserRepository } from "@/repositories/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ShortenerUrlUseCase } from ".";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { ShortWrongUrlError } from "../errors/short-wrong-url-error";

describe("Url Shortener use case", () => {
  let urlRepository: UrlRepositoryInMemory;
  let userRepository: UserRepository;
  let sut: ShortenerUrlUseCase;

  beforeEach(async () => {
    urlRepository = new UrlRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();

    sut = new ShortenerUrlUseCase(urlRepository, userRepository);
  });

  it("should be can short a url", async () => {
    const url = await sut.execute({
      origUrl: "https://goglassbr.com/seminovos/",
      userId: "",
    });

    expect(url?.shortUrl).toEqual(expect.any(String));
  });

  it("should not be able to short a url when use incorrect origUrl", async () => {
    expect(
      sut.execute({
        origUrl: "oi, sou um teste",
        userId: null,
      }),
    ).rejects.toBeInstanceOf(ShortWrongUrlError);
  });

  it("should not be able to short a url when use incorrect userId", async () => {
    expect(
      sut.execute({
        origUrl: "www.google.com.br",
        userId: "teste",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
