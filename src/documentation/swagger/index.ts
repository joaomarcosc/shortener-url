import {
  getShortedUrlSchema,
  searchManyUrlSchema,
  updateUrlBodySchema,
  updateUrlQuerySchema,
  urlCreateSchema,
} from "@/schemas/url";
import { userAuthenticateSchema, userCreateSchema } from "@/schemas/user";
import zodToJsonSchema from "zod-to-json-schema";

export const swaggerTagsGroups = {
  url: ["url"],
  user: ["user"],
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

export const urlSearchManyJsonSchema = {
  querystring: zodToJsonSchema(searchManyUrlSchema),
  tags: swaggerTagsGroups.url,
};

export const urlUpdateJsonSchema = {
  body: zodToJsonSchema(updateUrlBodySchema),
  querystring: zodToJsonSchema(updateUrlQuerySchema),
  tags: swaggerTagsGroups.url,
};

/* ----------------  USER --------------- */
export const userCreateJsonSchema = {
  body: zodToJsonSchema(userCreateSchema),
  tags: swaggerTagsGroups.user,
};

export const userAuthenticateJsonSchema = {
  body: zodToJsonSchema(userAuthenticateSchema),
  tags: swaggerTagsGroups.user,
};
