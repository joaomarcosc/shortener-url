import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import { env } from "../../env";
import type { DB } from "./types/db";

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
});

const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<DB>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
