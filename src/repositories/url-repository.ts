import type { Url } from "@/infra/db/types/db";
import type { Selectable } from "kysely";

export interface FindOneUrlParams {
  origUrl?: string;
  urlId?: string;
}

export interface CreateUrlParams extends Omit<Selectable<Url>, "createdAt" | "updatedAt" | "id"> {}

export interface SearchManyParams {
  query?: string;
  userId: string;
  page: number;
  perPage: number;
  order: "asc" | "desc";
}

export interface UpdateOneParams {
  urlId: string;
  userId?: string;
  origUrl?: string;
  incClick?: number;
}

export interface UrlRepository {
  create(data: CreateUrlParams): Promise<Selectable<Url> | undefined>;
  findOne(data: FindOneUrlParams): Promise<Selectable<Url> | undefined>;
  updateOne(data: UpdateOneParams): Promise<void>;
  searchMany(data: SearchManyParams): Promise<Array<Selectable<Url>> | undefined>;
}
