import { z } from "zod";

export const editMessageSchema = z.object({
    content: z
        .string()
        .trim()
        .min(1, "Message cannot be empty.")
        .max(5000, "Message is too long.")
});