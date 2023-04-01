import { z } from "zod";

export const inputSchema = z.object({
  name: z.string().nonempty(),
  content: z.string().nonempty(),
});

export type Input = z.infer<typeof inputSchema>;
