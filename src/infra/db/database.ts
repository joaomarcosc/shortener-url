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
  log: (event) => {
    if (event.level === "error") {
      console.error(event);
    } else {
      console.log(`[QUERY] ${event.query.sql}`);
      console.log(
        `[PARAMETERS] ${event.query.parameters.map((p, i) => `$${i + 1} = ${JSON.stringify(p)}`).join(", ")}`,
      );
      console.log(`[DURATION] ${event.queryDurationMillis}ms`);
      console.log();
    }
  },
});
