import { z } from "zod";

export const inputSchema = z.object({ id: z.string().uuid() });

export type Input = z.infer<typeof inputSchema>;
