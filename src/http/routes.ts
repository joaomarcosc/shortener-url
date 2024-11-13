import type { FastifyInstance } from "fastify";
import { urlRoutes } from "./controller/url.routes";
import { userRoutes } from "./controller/user.routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(urlRoutes);
  app.register(userRoutes);
}
