import { Module } from '@nestjs/common'
import { ListsService } from './lists.service'
import { ListsController } from './lists.controller'
import { UserEntity } from '@src/users/entities'
import { ListEntity } from './entities'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity, UserEntity])],
  providers: [ListsService],
  controllers: [ListsController],
})
export class ListsModule {}
