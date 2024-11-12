import type { CreateUrlInput, GetShortedUrlInput } from "@/schemas/url";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { ShortWrongUrlError } from "@/use-cases/errors/short-wrong-url-error";
import { makeGetShortedUrlFactory } from "@/use-cases/factories/make-get-shorted-url-factory";
import { makeShortenerUrlFactory } from "@/use-cases/factories/make-shortener-url-factory";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UrlController {
  async create(
    req: FastifyRequest<{
      Body: CreateUrlInput;
    }>,
    reply: FastifyReply,
  ) {
    const body = req.body;

    try {
      const makeShortenerUrl = makeShortenerUrlFactory();

      const url = await makeShortenerUrl.execute(body);

      reply.status(201).send({
        url: url?.shortUrl,
      });
    } catch (error) {
      if (error instanceof ShortWrongUrlError) {
        return reply.status(error.statusCode).send({
          message: error.message,
        });
      }

      throw error;
    }
  }

  async get(
    req: FastifyRequest<{
      Params: GetShortedUrlInput;
    }>,
    reply: FastifyReply,
  ) {
    const params = req.params;

    try {
      const makeShortenerUrl = makeGetShortedUrlFactory();

      const url = await makeShortenerUrl.execute(params);

      reply.redirect(url.origUrl);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return reply.status(error.statusCode).send({
          message: error.message,
        });
      }

      throw error;
    }
  }
}
