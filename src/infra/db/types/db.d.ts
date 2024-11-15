/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Url {
  clicks: Generated<number>;
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  id: Generated<string>;
  origUrl: string;
  updatedAt: Generated<Timestamp>;
  urlId: string;
  userId: string | null;
}

export interface User {
  createdAt: Generated<Timestamp>;
  email: string;
  hashedPassword: string;
  id: Generated<string>;
  name: string;
  updatedAt: Generated<Timestamp>;
}

export interface DB {
  url: Url;
  user: User;
}
