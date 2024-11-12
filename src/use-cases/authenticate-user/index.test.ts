import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import bcrypt from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUserUseCase } from ".";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { ResourceNotFoundError } from "../errors/resource-not-found";
// import { InvalidCredentialsError } from "../errors/invalid-credentials";
// import { AuthenticateChurchUseCase } from "./authenticate-church";

describe("Authenticate church use case", () => {
  let userRepository: UserRepositoryInMemory;
  let sut: AuthenticateUserUseCase;

  beforeEach(async () => {
    userRepository = new UserRepositoryInMemory();

    await userRepository.create({
      email: "teste@teste.com",
      hashedPassword: await bcrypt.hash("teste", 6),
      name: "joao",
    });

    sut = new AuthenticateUserUseCase(userRepository);
  });

  it("should be can authenticate with correct data", async () => {
    const user = await sut.execute({
      email: "teste@teste.com",
      password: "teste",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be can authenticate with wrong password", async () => {
    expect(
      sut.execute({
        email: "teste@teste.com",
        password: "teste2",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be can authenticate with wrong email", async () => {
    expect(
      sut.execute({
        email: "teste2@teste.com",
        password: "teste",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
