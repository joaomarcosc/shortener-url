import { db } from "@/infra/db/database";
import type { Url } from "@/infra/db/types/db";
import type { Selectable } from "kysely";
import type { CreateUrlParams, FindOneUrlParams, SearchManyParams, UrlRepository } from "../url-repository";

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

  async searchMany(data: SearchManyParams): Promise<Array<Selectable<Url>> | undefined> {
    let query = db
      .selectFrom("url")
      .selectAll()
      .where("userId", "=", data.userId)
      .orderBy("clicks", data.order)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage);

    if (data.query) {
      query = query.where("origUrl", "like", `%${data.query}%`);
    }

    const urls = await query.execute();

    return urls;
  }
}
