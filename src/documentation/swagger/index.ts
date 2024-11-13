import {
  deleteUrlSchema,
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
  refreshToken: ["refreshToken"],
};

/* **************************

    SWAGGER DOCUMENTATION

***************************** */

/* ----------------  URL --------------- */
export const urlCreateJsonSchema = {
  body: zodToJsonSchema(urlCreateSchema),
  tags: swaggerTagsGroups.url,
  description: "Create a short url",
};

export const urlGetJsonSchema = {
  params: zodToJsonSchema(getShortedUrlSchema),
  tags: swaggerTagsGroups.url,
  security: [{ bearerAuth: [] }],
  description: "Redirect to the shorted url value",
};

export const urlSearchManyJsonSchema = {
  querystring: zodToJsonSchema(searchManyUrlSchema),
  tags: swaggerTagsGroups.url,
  security: [{ bearerAuth: [] }],
  description: "Search urls per user",
};

export const urlUpdateJsonSchema = {
  body: zodToJsonSchema(updateUrlBodySchema),
  querystring: zodToJsonSchema(updateUrlQuerySchema),
  tags: swaggerTagsGroups.url,
  security: [{ bearerAuth: [] }],
  description: "Update specific url",
};

export const urlDeleteJsonSchema = {
  params: zodToJsonSchema(deleteUrlSchema),
  tags: swaggerTagsGroups.url,
  security: [{ bearerAuth: [] }],
  description: "Delete specific url",
};

/* ----------------  USER --------------- */
export const userCreateJsonSchema = {
  body: zodToJsonSchema(userCreateSchema),
  tags: swaggerTagsGroups.user,
  description: "Create user",
};

export const userAuthenticateJsonSchema = {
  body: zodToJsonSchema(userAuthenticateSchema),
  tags: swaggerTagsGroups.user,
  description: "Authenticate user",
};
