import type { UserRepository } from "@/repositories/user-repository";
import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { ResourceNotFoundError } from "../errors/resource-not-found";

interface AuthenticateUserUseCaseParams {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: AuthenticateUserUseCaseParams) {
    const user = await this.userRepository.findOne({ email: data.email });

    if (!user) {
      throw new ResourceNotFoundError("User");
    }

    const doesPasswordMatch = await bcrypt.compare(data.password, user.hashedPassword);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
