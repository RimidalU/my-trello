import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'

import { CommentEntity } from './entities'
import { UserEntity } from '@src/users/entities'

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
