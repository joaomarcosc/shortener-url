import fastifyFormbody from "@fastify/formbody";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { env } from "./env";
import { appRoutes } from "./http/routes";

const app = fastify({
  logger: env.NODE_ENV === "development",
});

app.register(fastifyFormbody);
app.register(fastifyMultipart);

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Shortener Url API",
      description: "Documentation to use Shortener Url api in your project.",
      version: "0.1.0",
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
});

app.register(appRoutes, {
  prefix: "/api/v1",
});

app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV !== "production") {
    console.error(error.stack);
  }

  return reply.status(error.statusCode ?? 500).send({ message: error.message });
});

export { app };
