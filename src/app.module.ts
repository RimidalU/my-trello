import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'

import { getConfigModuleConfig } from './configs'
import { EnvModule } from './env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleConfig()),
    UserModule,
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
