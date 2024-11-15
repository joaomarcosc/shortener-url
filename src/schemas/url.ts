import { z } from "zod";

export const urlCreateSchema = z.object({
  origUrl: z.string({
    required_error: "origUrl is required",
  }),
});

export const getShortedUrlSchema = z.object({
  urlId: z.string({
    required_error: "urlId is required",
  }),
});

export const searchManyUrlSchema = z.object({
  query: z.string().optional(),
  perPage: z.coerce.number({
    required_error: "perPage is required",
  }),
  page: z.coerce.number({
    required_error: "page is required",
  }),
  order: z.enum(["asc", "desc"]),
});

export const updateUrlBodySchema = z.object({
  origUrl: z.string({
    required_error: "origUrl is required",
  }),
});

export const updateUrlQuerySchema = z.object({
  urlId: z.string({
    required_error: "urlId is required",
  }),
});

export const deleteUrlSchema = z.object({
  urlId: z.string({
    required_error: "urlId is required",
  }),
});

// CREATE
export type CreateUrlInput = z.infer<typeof urlCreateSchema>;

// GET
export type GetShortedUrlInput = z.infer<typeof getShortedUrlSchema>;

// List
export type SearchManyUrlsInput = z.infer<typeof searchManyUrlSchema>;

// Update
export type UpdateUrlBodyInput = z.infer<typeof updateUrlBodySchema>;
export type UpdateUrlQueryInput = z.infer<typeof updateUrlQuerySchema>;

// Delete
export type DeleteUrlInput = z.infer<typeof deleteUrlSchema>;
