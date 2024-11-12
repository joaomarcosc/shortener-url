import "dotenv/config";

import z from "zod";

const databaseSchema = {
  DATABASE_URL: z.string().min(1, { message: "DATABASE_URL is required" }),
};

const envSchema = z.object({
  ...databaseSchema,
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  SECRET_KEY: z.string().min(1),
  BASE_URL: z.string().min(1),
});

/*
If you don't want Zod to throw errors when validation fails, use .safeParse. This method returns an object containing either the successfully parsed data or a ZodError instance containing detailed information about the validation problems. https://zod.dev/?id=safeparse
*/
const _env = envSchema.safeParse(process.env);

if (_env.error) {
  console.error("⚠️ invalid environment variables", _env.error.format());

  throw new Error("invalid environment variables");
}

export const env = _env.data;
