import fastifyJwt from "@fastify/jwt";
import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { env } from "../env";

const jwtPlugin: FastifyPluginCallback = (app, _, done) => {
  app.register(fastifyJwt, {
    secret: env.SECRET_KEY,
  });

  app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      await request.jwtVerify();
    } catch (_) {
      reply.status(401).send({
        message: "Unauthorized",
      });
    }
  });

  done();
};

export default fastifyPlugin(jwtPlugin);
