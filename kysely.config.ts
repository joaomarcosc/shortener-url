import { defineConfig } from "kysely-ctl";
import { db } from "./src/infra/db/database";

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "/src/infra/db/migrations",
  },
  seeds: {
    seedFolder: "/src/infra/db/seeds",
  },
});
