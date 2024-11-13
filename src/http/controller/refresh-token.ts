import type { FastifyReply } from "fastify";
import type { FastifyRequest } from "fastify/types/request";

export class RefreshTokenController {
  async generate(req: FastifyRequest, reply: FastifyReply) {
    await req.jwtVerify({ onlyCookie: true });

    const userId = req.user.sub;
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: userId,
        },
      },
    );
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: userId,
          expiresIn: "7d",
        },
      },
    );
    return reply
      .status(201)
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .send({
        token,
      });
  }
}
