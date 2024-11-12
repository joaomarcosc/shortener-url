import { app } from "./app";
import { env } from "./env";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 Server listen on ${env.PORT}`);
  })
  .catch((error) => {
    console.log(error);
  });
