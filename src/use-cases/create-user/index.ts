import type { UserRepository } from "@/repositories/user-repository";
import type { CreateUserInput } from "@/schemas/user";
import { hash } from "bcrypt";
import { PasswordDoesNotMatchError } from "../errors/password-does-not-match-error";
import { ResourceAlreadyExistsError } from "../errors/resource-already-exists-error";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserInput) {
    const { confirmPassword, password, ...rest } = data;
    const hasUser = await this.userRepository.findOne({
      email: rest.email,
    });

    if (hasUser) {
      throw new ResourceAlreadyExistsError("User");
    }

    if (confirmPassword !== password) {
      throw new PasswordDoesNotMatchError();
    }

    const hashedPassword = await hash(password, 6);

    const user = await this.userRepository.create({ ...rest, hashedPassword });

    return { user };
  }
}
