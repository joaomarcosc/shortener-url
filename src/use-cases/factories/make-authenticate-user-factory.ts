import { UserRepositoryKysely } from "@/repositories/kysely/user-repository-kysely";
import { AuthenticateUserUseCase } from "../authenticate-user";

export function makeAuthenticateUserFactory() {
  const userRepository = new UserRepositoryKysely();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

  return authenticateUserUseCase;
}
