import { z } from 'zod';

export const launchFormSchema = z.object({
  name: z.string().min(1, 'Token name is required').max(32, 'Token name too long'),
  symbol: z.string().min(1, 'Token symbol is required').max(10, 'Token symbol too long'),
  decimals: z.number().min(0).max(9, 'Decimals must be between 0 and 9'),
  supply: z.number().min(1, 'Supply must be greater than 0'),
  image: z.instanceof(File).nullable(),
});

export type LaunchFormInputs = z.infer<typeof launchFormSchema>;