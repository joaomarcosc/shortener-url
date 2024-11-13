import {
  type CreateUrlInput,
  type GetShortedUrlInput,
  deleteUrlSchema,
  searchManyUrlSchema,
  updateUrlBodySchema,
  updateUrlQuerySchema,
} from "@/schemas/url";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found";
import { ShortWrongUrlError } from "@/use-cases/errors/short-wrong-url-error";
import { makeDeleteUrlFactory } from "@/use-cases/factories/make-delete-url-factory";
import { makeGetShortedUrlFactory } from "@/use-cases/factories/make-get-shorted-url-factory";
import { makeSearchManyUrlFactory } from "@/use-cases/factories/make-search-many-url-factory";
import { makeShortenerUrlFactory } from "@/use-cases/factories/make-shortener-url-factory";
import { makeUpdateUrlFactory } from "@/use-cases/factories/make-update-url-factory";
import { HTTP_STATUS_CODE } from "@/utils/status-codes";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UrlController {
  async create(
    req: FastifyRequest<{
      Body: CreateUrlInput;
    }>,
    reply: FastifyReply,
  ) {
    const body = req.body;

    if (req.headers.authorization) {
      try {
        await req.jwtVerify();
      } catch (_) {
        reply.status(401).send({
          message: "Unauthorized",
        });
      }
    }

    try {
      const makeShortenerUrl = makeShortenerUrlFactory();

      const user = req.user?.sub;

      const url = await makeShortenerUrl.execute({ origUrl: body.origUrl, userId: user ?? null });

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

  async list(req: FastifyRequest, reply: FastifyReply) {
    const query = searchManyUrlSchema.parse(req.query);
    const userId = req.user?.sub ?? "";

    try {
      const makeSearchManyUrl = makeSearchManyUrlFactory();

      const urls = await makeSearchManyUrl.execute({ ...query, userId });

      return reply.status(200).send({
        urls,
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return reply.status(error.statusCode).send({
          message: error.message,
        });
      }

      throw error;
    }
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = req.user?.sub ?? "";
      const query = updateUrlQuerySchema.parse(req.query);
      const body = updateUrlBodySchema.parse(req.body);

      const makeUpdateUrl = makeUpdateUrlFactory();

      await makeUpdateUrl.execute({
        origUrl: body.origUrl,
        urlId: query.urlId,
        userId,
      });

      return reply.status(HTTP_STATUS_CODE.NoContent).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return reply.status(error.statusCode).send({
          message: error.message,
        });
      }

      throw error;
    }
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = req.user?.sub ?? "";
      const params = deleteUrlSchema.parse(req.params);

      const makeDeleteUrl = makeDeleteUrlFactory();

      await makeDeleteUrl.execute({
        urlId: params.urlId,
        userId,
      });

      return reply.status(HTTP_STATUS_CODE.NoContent).send();
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
