import type { Url } from "@/infra/db/types/db";
import type { Selectable } from "kysely";

export interface FindOneUrlParams {
  origUrl?: string;
  urlId?: string;
}

export interface CreateUrlParams extends Omit<Selectable<Url>, "createdAt" | "updatedAt" | "id"> {}

export interface UrlRepository {
  create(data: CreateUrlParams): Promise<Selectable<Url> | undefined>;
  findOne(data: FindOneUrlParams): Promise<Selectable<Url> | undefined>;
  updateOne(urlId: string, incClick: number): Promise<void>;
}
