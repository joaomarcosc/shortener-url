import { urlCreateJsonSchema, urlGetJsonSchema } from "@/documentation/swagger";
import type { FastifyInstance } from "fastify";
import { UrlController } from "./url";

export async function urlRoutes(app: FastifyInstance) {
  const urlController = new UrlController();

  app.post("create", { schema: urlCreateJsonSchema }, urlController.create);
  app.get(":urlId", { schema: urlGetJsonSchema }, urlController.get);
}
