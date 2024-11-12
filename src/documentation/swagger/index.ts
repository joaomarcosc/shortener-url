import { getShortedUrlSchema, urlCreateSchema } from "@/schemas/url";
import { userCreateSchema } from "@/schemas/user";
import zodToJsonSchema from "zod-to-json-schema";

export const swaggerTagsGroups = {
  url: ["url"],
};

/* **************************

    SWAGGER DOCUMENTATION

***************************** */

/* ----------------  URL --------------- */
export const urlCreateJsonSchema = {
  body: zodToJsonSchema(urlCreateSchema),
  tags: swaggerTagsGroups.url,
};

export const urlGetJsonSchema = {
  params: zodToJsonSchema(getShortedUrlSchema),
  tags: swaggerTagsGroups.url,
};

/* ----------------  USER --------------- */
export const userCreateJsonSchema = {
  body: zodToJsonSchema(userCreateSchema),
  tags: swaggerTagsGroups.url,
};
