import type { Url, User } from "@/infra/db/types/db";
import { UrlRepositoryInMemory } from "@/repositories/in-memory/url-repository-in-memory";
import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import type { UserRepository } from "@/repositories/user-repository";
import bcrypt from "bcrypt";
import type { Selectable } from "kysely";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteUrlUseCase } from ".";
import { ShortenerUrlUseCase } from "../shortener-url";

describe("DeleteUrl use case", () => {
  let urlRepository: UrlRepositoryInMemory;
  let userRepository: UserRepository;
  let shortenerUrlUseCase: ShortenerUrlUseCase;
  let sut: DeleteUrlUseCase;
  let url: Selectable<Url> | undefined;
  let user: Selectable<User> | undefined;

  const origUrl = "https://www.google.com/";

  beforeEach(async () => {
    urlRepository = new UrlRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();
    shortenerUrlUseCase = new ShortenerUrlUseCase(urlRepository, userRepository);
    sut = new DeleteUrlUseCase(urlRepository, userRepository);

    user = await userRepository.create({
      email: "teste@teste.com",
      hashedPassword: await bcrypt.hash("teste", 6),
      name: "joao",
    });

    url = await shortenerUrlUseCase.execute({
      origUrl,
      userId: user?.id ?? "",
    });

    vi.useFakeTimers();
  });

  it("deletedAt return NULL by default", async () => {
    expect(url?.deletedAt).toBeNull();
  });

  it("Should be can set deletedAt", async () => {
    const date = new Date();
    await sut.execute({
      urlId: url?.urlId ?? "",
      userId: user?.id ?? "",
    });

    expect(url?.deletedAt).toEqual(date);
  });
});
