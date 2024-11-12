import { type Kysely, sql } from "kysely";
import type { DB } from "../types/db";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("url")
    .addColumn("id", "uuid", (col) => col.defaultTo(sql`gen_random_uuid()`).primaryKey().unique().notNull())
    .addColumn("urlId", "varchar", (col) => col.notNull())
    .addColumn("origUrl", "varchar", (col) => col.notNull())
    .addColumn("shortUrl", "varchar", (col) => col.notNull())
    .addColumn("clicks", "integer", (col) => col.defaultTo(0).notNull())
    .addColumn("createdAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updatedAt", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("url").execute();
}
