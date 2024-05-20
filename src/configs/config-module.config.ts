import { ConfigModuleOptions } from '@nestjs/config'

export const getConfigModuleConfig = (): ConfigModuleOptions => {
  return {
    isGlobal: true,
    envFilePath: ['.env.dev', '.env.prod'],
  }
}
