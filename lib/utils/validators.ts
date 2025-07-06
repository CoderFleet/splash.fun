import { z } from "zod";

export const launchFormSchema = z.object({
  name: z.string().min(2, "Name too short"),
  symbol: z.string().min(1).max(10).regex(/^[A-Z]+$/, "Use uppercase letters"),
  decimals: z.number().min(0).max(9),
  supply: z.number().positive(),
  image: z.any().optional(), // z.instanceof(File) if strict
});

export type LaunchFormInputs = z.infer<typeof launchFormSchema>;
