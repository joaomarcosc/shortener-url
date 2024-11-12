import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCase } from ".";
import { PasswordDoesNotMatchError } from "../errors/password-does-not-match-error";
import { ResourceAlreadyExistsError } from "../errors/resource-already-exists-error";

describe("Create User Use Case", () => {
  let userRepository: UserRepositoryInMemory;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    sut = new CreateUserUseCase(userRepository);
  });

  it("Should be able to create an user with correct data", async () => {
    const { user } = await sut.execute({
      name: "test",
      email: "test@teste.com",
      password: "test12345",
      confirmPassword: "test12345",
    });

    expect(user?.id).toEqual(expect.any(String));
  });

  it("Should be able to hash password when create account", async () => {
    const { user } = await sut.execute({
      name: "test",
      email: "test@teste.com",
      password: "test12345",
      confirmPassword: "test12345",
    });

    const doesPasswordHashed = await compare("test12345", user?.hashedPassword ?? "");

    expect(doesPasswordHashed).toBeTruthy();
  });

  it("Should not be able to create account with same email", async () => {
    await sut.execute({
      name: "test",
      email: "test@teste.com",
      password: "test12345",
      confirmPassword: "test12345",
    });

    expect(
      sut.execute({
        name: "test",
        email: "test@teste.com",
        password: "test12345",
        confirmPassword: "test12345",
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });

  it("Should not be able to create account when password does not match confirmPassword", async () => {
    expect(
      sut.execute({
        name: "test",
        email: "test@teste.com",
        password: "test",
        confirmPassword: "test12325",
      }),
    ).rejects.toBeInstanceOf(PasswordDoesNotMatchError);
  });
});
