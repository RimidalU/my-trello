import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'

import { CommentEntity } from './entities'
import { UserEntity } from '@src/users/entities'
import { CardEntity } from '@src/cards/entities'

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, CardEntity])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
