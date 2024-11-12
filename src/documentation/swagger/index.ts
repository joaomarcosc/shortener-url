import { getShortedUrlSchema, urlCreateSchema } from "@/schemas/url";
import zodToJsonSchema from "zod-to-json-schema";

export const swaggerTagsGroups = {
  url: ["url"],
};

/* -------------------------

    SWAGGER DOCUMENTATION

-------------------------- */
export const urlCreateJsonSchema = {
  body: zodToJsonSchema(urlCreateSchema),
  tags: swaggerTagsGroups.url,
};

export const urlGetJsonSchema = {
  params: zodToJsonSchema(getShortedUrlSchema),
  tags: swaggerTagsGroups.url,
};
