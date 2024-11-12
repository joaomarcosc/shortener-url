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

// CREATE
export type CreateUrlInput = z.infer<typeof urlCreateSchema>;

// GET
export type GetShortedUrlInput = z.infer<typeof getShortedUrlSchema>;
