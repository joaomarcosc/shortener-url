import type { FastifyInstance } from "fastify";
import { refreshTokenRoutes } from "./controller/refresh-token-routes";
import { urlRoutes } from "./controller/url.routes";
import { userRoutes } from "./controller/user.routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(urlRoutes);
  app.register(userRoutes, {
    prefix: "/auth/",
  });
  app.register(refreshTokenRoutes, {
    prefix: "/refresh-token",
  });
}
