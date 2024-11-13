import type { Kysely } from "kysely";
import type { DB } from "../types/db";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema.alterTable("url").dropColumn("shortUrl").execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.alterTable("url").dropColumn("shortUrl").execute();
}
