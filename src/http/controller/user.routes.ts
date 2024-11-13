import { swaggerTagsGroups, userAuthenticateJsonSchema, userCreateJsonSchema } from "@/documentation/swagger";
import type { FastifyInstance } from "fastify";
import { UserController } from "./user";

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController();

  app.post("register", { schema: userCreateJsonSchema }, userController.create);
  app.post("login", { schema: userAuthenticateJsonSchema }, userController.authenticate);
  app.post(
    "logout",
    { schema: { tags: swaggerTagsGroups.user, description: "Logout user cleaning cookies" } },
    userController.logout,
  );
}
