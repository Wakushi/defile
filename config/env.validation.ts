import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3001'),
  PRIVATE_KEY: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;
