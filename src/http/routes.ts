import type { FastifyInstance } from "fastify";
import { urlRoutes } from "./controller/url.routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(urlRoutes, {
    prefix: "/short-url/",
  });
}
