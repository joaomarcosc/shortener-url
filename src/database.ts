import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import type { DB } from "kysely-codegen";
import { Pool } from "pg";
import { env } from "./env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<DB>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
