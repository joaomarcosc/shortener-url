import {
  urlCreateJsonSchema,
  urlGetJsonSchema,
  urlSearchManyJsonSchema,
  urlUpdateJsonSchema,
} from "@/documentation/swagger";
import type { FastifyInstance } from "fastify";
import { UrlController } from "./url";

export async function urlRoutes(app: FastifyInstance) {
  const urlController = new UrlController();

  // public routes
  app.post("/", { schema: urlCreateJsonSchema }, urlController.create);
  app.get("/:urlId", { schema: urlGetJsonSchema }, urlController.get);

  // private routes
  app.get("/", { schema: urlSearchManyJsonSchema, onRequest: [app.authenticate] }, urlController.list);
  app.patch("/", { schema: urlUpdateJsonSchema, onRequest: [app.authenticate] }, urlController.update);
}
