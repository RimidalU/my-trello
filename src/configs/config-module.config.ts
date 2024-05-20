import { ConfigModuleOptions } from '@nestjs/config'
import { envSchema } from '@src/env'

export const getConfigModuleConfig = (): ConfigModuleOptions => {
  return {
    isGlobal: true,
    validate: (env) => envSchema.parse(env),
    envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
  }
}
