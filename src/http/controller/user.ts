import type { CreateUserInput } from "@/schemas/user";
import { PasswordDoesNotMatchError } from "@/use-cases/errors/password-does-not-match-error";
import { ResourceAlreadyExistsError } from "@/use-cases/errors/resource-already-exists-error";
import { makeCreateUserFactory } from "@/use-cases/factories/make-create-user-factory";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
  async create(
    req: FastifyRequest<{
      Body: CreateUserInput;
    }>,
    reply: FastifyReply,
  ) {
    const body = req.body;

    try {
      const makeCreateUser = makeCreateUserFactory();

      await makeCreateUser.execute(body);

      return reply.status(201).send({
        message: "User created",
      });
    } catch (error) {
      if (error instanceof PasswordDoesNotMatchError || error instanceof ResourceAlreadyExistsError) {
        return reply.status(error.statusCode).send({
          message: error.message,
        });
      }

      throw error;
    }
  }
}
