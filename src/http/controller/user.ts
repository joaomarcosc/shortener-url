import type { AuthenticateUserInput, CreateUserInput } from "@/schemas/user";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { PasswordDoesNotMatchError } from "@/use-cases/errors/password-does-not-match-error";
import { ResourceAlreadyExistsError } from "@/use-cases/errors/resource-already-exists-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { makeAuthenticateUserFactory } from "@/use-cases/factories/make-authenticate-user-factory";
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

  async authenticate(
    req: FastifyRequest<{
      Body: AuthenticateUserInput;
    }>,
    reply: FastifyReply,
  ) {
    const body = req.body;

    try {
      const user = await makeAuthenticateUserFactory().execute(body);

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        },
      );

      return reply.status(200).send({
        token,
      });
    } catch (error) {
      if (error instanceof InvalidCredentialsError || error instanceof ResourceNotFoundError) {
        return reply.status(error.statusCode).send({ message: error.message });
      }

      throw error;
    }
  }
}
