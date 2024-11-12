import { db } from "@/infra/db/database";
import type { User } from "@/infra/db/types/db";
import type { Selectable } from "kysely";
import type { CreateUserParams, FindOneUserParams, UserRepository } from "../user-repository";

export class UserRepositoryKysely implements UserRepository {
  async create(data: CreateUserParams): Promise<Selectable<User> | undefined> {
    const user = await db.insertInto("user").values(data).returningAll().executeTakeFirst();

    return user;
  }

  async findOne(data: FindOneUserParams): Promise<Selectable<User> | undefined> {
    let query = db.selectFrom("user").selectAll();

    if (data.email) {
      query = query.where("user.email", "=", data.email);
    }

    if (data.id) {
      query = query.where("user.id", "=", data.id);
    }

    if (data.name) {
      query = query.where("user.name", "=", data.name);
    }

    const user = query.executeTakeFirst();

    return user;
  }
}
