import { z } from "zod";

export const todoSchema = z.object({
  desc: z
    .string()
    .min(3, { message: "Minimum 3 characters required" })
    .max(100, { message: "Maximum 100 characters allowed" }),
});
