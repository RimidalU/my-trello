import { z } from 'zod'

export const envSchema = z.object({
  SSL: z.coerce.string(),
  API_PORT: z.coerce.number().optional().default(3000),
  API_HOST: z.coerce.string().min(1).optional().default('http://localhost:'),
  TYPE_ORM_CONNECTION: z.coerce.string().min(3),
  TYPE_ORM_DATABASE: z.coerce.string().min(1),
  TYPE_ORM_USER: z.coerce.string().min(1),
  TYPE_ORM_PASSWORD: z.coerce.string().min(1),
  TYPE_ORM_PORT: z.coerce.number().min(4),
  TYPE_ORM_HOST: z.coerce.string().min(1).optional().default('localhost'),
  JWT_CONSTANTS_SECRET: z.coerce.string().min(10),
})
export type Env = z.infer<typeof envSchema>
