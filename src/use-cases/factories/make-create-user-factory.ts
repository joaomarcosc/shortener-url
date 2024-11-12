import { UserRepositoryKysely } from "@/repositories/kysely/user-repository-kysely";
import { CreateUserUseCase } from "../create-user";

export function makeCreateUserFactory() {
  const userRepository = new UserRepositoryKysely();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  return createUserUseCase;
}
