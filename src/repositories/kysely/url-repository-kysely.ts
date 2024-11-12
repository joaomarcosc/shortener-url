import { db } from "@/database";
import type { Selectable } from "kysely";
import type { Url } from "kysely-codegen";
import type { CreateUrlParams, FindOneUrlParams, UrlRepository } from "../url-repository";

export class UrlRepositoryKysely implements UrlRepository {
  async findOne(data: FindOneUrlParams): Promise<Selectable<Url> | undefined> {
    const url = await db
      .selectFrom("url")
      .where((eb) => eb("url.urlId", "=", data.urlId ?? "").or("url.origUrl", "=", data.origUrl ?? ""))
      .selectAll()
      .executeTakeFirst();

    return url;
  }
  async create(data: CreateUrlParams): Promise<Selectable<Url> | undefined> {
    const url = await db.insertInto("url").values(data).returningAll().executeTakeFirst();

    return url;
  }

  async updateOne(urlId: string, incClick: number): Promise<void> {
    await db
      .updateTable("url")
      .set({
        clicks: incClick,
      })
      .where("url.urlId", "=", urlId)
      .execute();
  }
}
