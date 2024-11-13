import { swaggerTagsGroups } from "@/documentation/swagger";
import type { FastifyInstance } from "fastify";
import { RefreshTokenController } from "./refresh-token";

export async function refreshTokenRoutes(app: FastifyInstance) {
  const refreshTokenController = new RefreshTokenController();

  app.patch(
    "/",
    {
      schema: {
        tags: swaggerTagsGroups.refreshToken,
        description: "Refresh and revalid a token",
      },
    },
    refreshTokenController.generate,
  );
}
