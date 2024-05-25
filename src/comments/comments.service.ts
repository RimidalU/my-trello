import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '@src/users/entities'
import { CommentEntity } from './entities'
import { CreateCommentDto } from './dto'
import { CommentNotFoundException } from './exceptions'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    currentUserId: number,
    payload: CreateCommentDto,
  ): Promise<number> {
    const owner = await this.userRepository.findOneBy({ id: currentUserId })

    const newComment = new CommentEntity()
    Object.assign(newComment, { ...payload, owner })

    const comment = await this.commentRepository.save(newComment)
    return comment.id
  }

  async getById(id: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
      relations: ['owner'],
    })
    if (!comment) {
      throw new CommentNotFoundException(['id', id])
    }
    return comment
  }
}
