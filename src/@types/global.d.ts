import "@fastify/jwt";

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
    };
  }
}
