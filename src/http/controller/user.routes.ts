import { swaggerTagsGroups, userAuthenticateJsonSchema, userCreateJsonSchema } from "@/documentation/swagger";
import type { FastifyInstance } from "fastify";
import { RefreshTokenController } from "./refresh-token";
import { UserController } from "./user";

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController();
  const refreshTokenController = new RefreshTokenController();

  app.post("/auth/register", { schema: userCreateJsonSchema }, userController.create);
  app.post("/auth/login", { schema: userAuthenticateJsonSchema }, userController.authenticate);
  app.post(
    "/auth/logout",
    { schema: { tags: swaggerTagsGroups.user, description: "Logout user cleaning cookies" } },
    userController.logout,
  );
  app.patch(
    "/auth/refresh-token",
    {
      schema: {
        tags: swaggerTagsGroups.refreshToken,
        description: "Refresh and revalid a token",
      },
    },
    refreshTokenController.generate,
  );
}
