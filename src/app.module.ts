import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './users/user.module'

import { getConfigModuleConfig } from './configs'
import { EnvModule } from './env/env.module'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { AuthMiddleware } from './auth/middlewares'
import { JwtModule } from '@nestjs/jwt'
import { CardsModule } from './cards/cards.module'
import { ListsModule } from './lists/lists.module'

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleConfig()),
    UserModule,
    EnvModule,
    DatabaseModule,
    JwtModule,
    AuthModule,
    CardsModule,
    ListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
