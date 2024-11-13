import type { Url, User } from "@/infra/db/types/db";
import { UrlRepositoryInMemory } from "@/repositories/in-memory/url-repository-in-memory";
import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import type { UserRepository } from "@/repositories/user-repository";
import bcrypt from "bcrypt";
import type { Selectable } from "kysely";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateUrlUseCase } from ".";
import { ShortenerUrlUseCase } from "../shortener-url";

describe("Get shorted url use case", () => {
  let urlRepository: UrlRepositoryInMemory;
  let userRepository: UserRepository;
  let shortenerUrlUseCase: ShortenerUrlUseCase;
  let sut: UpdateUrlUseCase;
  let url: Selectable<Url> | undefined;
  let user: Selectable<User> | undefined;

  const origUrl = "https://www.google.com/";

  beforeEach(async () => {
    urlRepository = new UrlRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();
    shortenerUrlUseCase = new ShortenerUrlUseCase(urlRepository, userRepository);
    sut = new UpdateUrlUseCase(urlRepository, userRepository);

    user = await userRepository.create({
      email: "teste@teste.com",
      hashedPassword: await bcrypt.hash("teste", 6),
      name: "joao",
    });

    url = await shortenerUrlUseCase.execute({
      origUrl,
      userId: user?.id ?? "",
    });
  });

  it("should be can GET a shorted url", async () => {
    const updatedUrl = "youtube.com.br";
    await sut.execute({
      origUrl: updatedUrl,
      urlId: url?.urlId ?? "",
      userId: user?.id ?? "",
    });

    expect(url?.origUrl).toEqual(updatedUrl);
  });
});
