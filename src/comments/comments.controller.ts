import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UserInfo } from '@src/users/decorators'
import {
  CommentConfirmationResponseDto,
  CommentItemDto,
  CommentResponseDto,
  CommentsResponseDto,
  CreateCommentDto,
  UpdateCommentDto,
} from './dto'
import {
  CreateSwaggerDecorator,
  GetAllSwaggerDecorator,
  GetByIdSwaggerDecorator,
  RemoveSwaggerDecorator,
  UpdateSwaggerDecorator,
} from './decorators'
import { ApiTags } from '@nestjs/swagger'
import { CommentEntity } from './entities'
import { CardEntity } from '@src/cards/entities'

@Controller()
@ApiTags('Comments routes')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('cards/:cardId/comments')
  @CreateSwaggerDecorator()
  async create(
    @UserInfo('id') currentUserId: number,
    @Param('cardId') cardId: number,
    @Body() payload: CreateCommentDto,
  ): Promise<CommentConfirmationResponseDto> {
    const card = await this.getCardById(cardId)

    const listId = await this.commentService.create(
      currentUserId,
      card,
      payload,
    )

    return this.buildCommentConfirmationResponse(listId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('comments/:id')
  @GetByIdSwaggerDecorator()
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentResponseDto> {
    const commentInfo = await this.commentService.getById(id)

    return {
      comment: this.buildCommentResponse(commentInfo),
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('comments/:id')
  @RemoveSwaggerDecorator()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo('id') currentUserId: number,
  ): Promise<CommentConfirmationResponseDto> {
    const commentId = await this.commentService.remove(id, currentUserId)

    return this.buildCommentConfirmationResponse(commentId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('comments/:id')
  @UpdateSwaggerDecorator()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCommentDto,
    @UserInfo('id') currentUserId: number,
  ): Promise<CommentConfirmationResponseDto> {
    const listId = await this.commentService.update(id, payload, currentUserId)

    return this.buildListConfirmationResponse(listId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('cards/:cardId/comments')
  @GetAllSwaggerDecorator()
  async getAllByListId(
    @Param('cardId') cardId: number,
  ): Promise<CommentsResponseDto> {
    const card = await this.getCardById(cardId)

    const comments = await this.commentService.getAllCommentsByCardId(card)

    return {
      comments: comments.map((comment) => this.buildCommentResponse(comment)),
    }
  }

  private async getCardById(cardId: number): Promise<CardEntity> {
    return await this.commentService.getCardById(cardId)
  }

  private buildListConfirmationResponse(
    commentId: number,
  ): CommentConfirmationResponseDto {
    return {
      comment: {
        itemId: commentId,
      },
    }
  }

  private buildCommentConfirmationResponse(
    commentId: number,
  ): CommentConfirmationResponseDto {
    return {
      comment: {
        itemId: commentId,
      },
    }
  }

  private buildCommentResponse(comment: CommentEntity): CommentItemDto {
    return {
      itemId: comment.id,
      item: {
        description: comment.description,
        createdAt: comment.createdAt,
      },
      owner: {
        id: comment.owner.id,
        name: comment.owner.name,
      },
    }
  }
}
