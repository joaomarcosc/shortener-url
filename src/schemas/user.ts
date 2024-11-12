import { z } from "zod";

export const userCreateSchema = z
  .object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email("invalid email format"),
    password: z.string({
      required_error: "password is required",
    }),
    confirmPassword: z.string({
      required_error: "confirmPassword is required",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "the password does not match the confirmPassword.",
        path: ["confirmPassword"],
      });
    }
  });

// CREATE
export type CreateUserInput = z.infer<typeof userCreateSchema>;
