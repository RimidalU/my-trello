import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '@src/users/entities'
import { CommentEntity } from './entities'
import { CreateCommentDto, UpdateCommentDto } from './dto'
import { CommentNotFoundException } from './exceptions'
import { CardEntity } from '@src/cards/entities'
import { CardNotFoundException } from '@src/cards/exceptions'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(
    currentUserId: number,
    card: CardEntity,
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
    })
    if (!comment) {
      throw new CommentNotFoundException(['id', id])
    }
    return comment
  }

  async remove(id: number, currentUserId: number): Promise<number> {
    const entity = await this.getById(id)

    if (entity.owner.id !== currentUserId) {
      throw new NotAcceptableException()
    }

    await this.commentRepository.remove(entity)
    return id
  }

  async update(
    id: number,
    payload: UpdateCommentDto,
    currentUserId: number,
  ): Promise<number> {
    const entity = await this.getById(id)

    if (entity.owner.id !== currentUserId) {
      throw new NotAcceptableException()
    }

    Object.assign(entity, payload)

    await this.commentRepository.save(entity)
    return entity.id
  }

  async getCardById(cardId: number): Promise<CardEntity> {
    const card = await this.cardRepository.findOneBy({ id: cardId })
    if (!card) {
      throw new CardNotFoundException(['id', cardId])
    }
    return card
  }
}
