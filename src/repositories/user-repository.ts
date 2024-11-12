import type { User } from "@/infra/db/types/db";
import type { Selectable } from "kysely";

export interface FindOneUserParams {
  name?: string;
  email?: string;
  id?: string;
}

export interface CreateUserParams extends Omit<Selectable<User>, "createdAt" | "updatedAt" | "id"> {}

export interface UserRepository {
  create(data: CreateUserParams): Promise<Selectable<User> | undefined>;
  findOne(data: FindOneUserParams): Promise<Selectable<User> | undefined>;
}
