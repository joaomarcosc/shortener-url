import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environmentMatchGlobs: [["./src/http/controller/**/*", "kysely"]],
    exclude: ["node_modules", "./build"],
  },
});
