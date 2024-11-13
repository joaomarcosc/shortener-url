import { randomUUID } from "node:crypto";
import type { Url } from "@/infra/db/types/db";
import type { Selectable } from "kysely";
import type {
  CreateUrlParams,
  FindOneUrlParams,
  SearchManyParams,
  UpdateOneParams,
  UrlRepository,
} from "../url-repository";

export class UrlRepositoryInMemory implements UrlRepository {
  url: Array<Selectable<Url>> = [];

  async findOne(data: FindOneUrlParams): Promise<Selectable<Url> | undefined> {
    const foundedUrl = this.url.find((it) => it.origUrl === data.origUrl || it.urlId === data.urlId);

    return foundedUrl;
  }

  async create(data: CreateUrlParams): Promise<Selectable<Url> | undefined> {
    const createdUrl: Selectable<Url> = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: randomUUID(),
    };

    this.url.push(createdUrl);

    return createdUrl;
  }

  async updateOne(data: UpdateOneParams): Promise<void> {
    const urlToUpdate = this.url.find((it) => {
      if (data.userId) {
        return it.urlId === data.urlId && it.userId === data.userId;
      }

      return it.id === data.urlId;
    });

    if (urlToUpdate) {
      if (data.incClick) {
        urlToUpdate.clicks = (urlToUpdate.clicks || 0) + data.incClick;
      }

      if (data.origUrl) {
        urlToUpdate.origUrl = data.origUrl;
      }

      urlToUpdate.updatedAt = new Date();
    }
  }

  async searchMany(data: SearchManyParams): Promise<Array<Selectable<Url>> | undefined> {
    const urls = this.url
      .filter((it) => it.userId === data.userId && it.origUrl.toLowerCase().includes(data.query ?? ""))
      .slice((data.page - 1) * data.perPage, data.page * data.perPage);

    return urls;
  }
}
