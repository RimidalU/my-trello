import { Module } from '@nestjs/common'
import { CardsController } from './cards.controller'
import { CardsService } from './cards.service'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from '@src/users/entities'
import { ListEntity } from '@src/lists/entities'
import { CardEntity } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, UserEntity, ListEntity])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
