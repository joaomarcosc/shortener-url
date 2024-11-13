import { db } from "@/infra/db/database";
import type { Url } from "@/infra/db/types/db";
import type { Selectable } from "kysely";
import type {
  CreateUrlParams,
  FindOneUrlParams,
  SearchManyParams,
  UpdateOneParams,
  UrlRepository,
} from "../url-repository";

export class UrlRepositoryKysely implements UrlRepository {
  async findOne(data: FindOneUrlParams): Promise<Selectable<Url> | undefined> {
    const url = await db
      .selectFrom("url")
      .where((eb) => eb("url.urlId", "=", data.urlId ?? "").or("url.origUrl", "=", data.origUrl ?? ""))
      .where("deletedAt", "is", null)
      .selectAll()
      .executeTakeFirst();

    return url;
  }
  async create(data: CreateUrlParams): Promise<Selectable<Url> | undefined> {
    const url = await db.transaction().execute(async (trx) => {
      return trx.insertInto("url").values(data).returningAll().executeTakeFirst();
    });

    return url;
  }

  async updateOne(data: UpdateOneParams): Promise<void> {
    let query = db.updateTable("url").where("url.urlId", "=", data.urlId).where("deletedAt", "is", null);

    if (data.userId) {
      query = query.where("url.userId", "=", data.userId);
    }

    if (data.origUrl) {
      query = query.set({
        origUrl: data.origUrl,
      });
    }

    if (data.incClick) {
      query = query.set({
        clicks: data.incClick,
      });
    }

    if (data.deletedAt) {
      query = query.set({
        deletedAt: data.deletedAt,
      });
    }

    await query.execute();
  }

  async searchMany(data: SearchManyParams): Promise<Array<Selectable<Url>> | undefined> {
    let query = db
      .selectFrom("url")
      .selectAll()
      .where("userId", "=", data.userId)
      .where("deletedAt", "is", null)
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
