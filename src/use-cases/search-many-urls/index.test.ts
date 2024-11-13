import { randomUUID } from "node:crypto";
import type { User } from "@/infra/db/types/db";
import { UrlRepositoryInMemory } from "@/repositories/in-memory/url-repository-in-memory";
import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import bcrypt from "bcrypt";
import type { Selectable } from "kysely";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchManyUrlUseCase } from ".";

let urlRepository: UrlRepositoryInMemory;
let userRepository: UserRepositoryInMemory;
let sut: SearchManyUrlUseCase;
let user: Selectable<User> | undefined;

describe("List urls by user use case", () => {
  beforeEach(async () => {
    urlRepository = new UrlRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();

    user = await userRepository.create({
      email: "teste@teste.com",
      hashedPassword: await bcrypt.hash("teste", 6),
      name: "joao",
    });

    sut = new SearchManyUrlUseCase(urlRepository, userRepository);
  });

  it("Should be to list urls when insert correct filter params", async () => {
    await urlRepository.create({
      clicks: 0,
      origUrl: "google.com",
      shortUrl: "google.com",
      userId: user?.id ?? "",
      urlId: randomUUID(),
    });

    await urlRepository.create({
      clicks: 0,
      origUrl: "youtube.com.br",
      shortUrl: "you.com.x",
      userId: user?.id ?? "",
      urlId: randomUUID(),
    });

    const urls = await sut.execute({
      userId: user?.id ?? "",
      order: "asc",
      page: 2,
      perPage: 1,
    });

    expect(urls).toEqual([expect.objectContaining({ origUrl: "youtube.com.br" })]);
    expect(urls?.length).toEqual(1);
  });
});
