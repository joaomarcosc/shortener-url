import { userCreateJsonSchema } from "@/documentation/swagger";
import type { FastifyInstance } from "fastify";
import { UserController } from "./user";

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController();

  app.post("create", { schema: userCreateJsonSchema }, userController.create);
}
