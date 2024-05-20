import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'

import { getConfigModuleConfig } from './configs'

@Module({
  imports: [ConfigModule.forRoot(getConfigModuleConfig()), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
