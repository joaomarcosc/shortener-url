import { randomUUID } from "node:crypto";
import type { User } from "@/infra/db/types/db";
import type { Selectable } from "kysely";
import type { CreateUserParams, FindOneUserParams, UserRepository } from "../user-repository";

export class UserRepositoryInMemory implements UserRepository {
  user: Array<Selectable<User>> = [];

  async findOne(data: FindOneUserParams): Promise<Selectable<User> | undefined> {
    const foundedUser = this.user.find((it) => it.email === data.email || it.name === data.name || it.id === data.id);

    return foundedUser;
  }

  async create(data: CreateUserParams): Promise<Selectable<User> | undefined> {
    const createdUser: Selectable<User> = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.user.push(createdUser);

    return createdUser;
  }
}
