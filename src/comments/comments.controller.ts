import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
  UseGuards,
  Delete,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UserInfo } from '@src/users/decorators'
import {
  CommentConfirmationResponseDto,
  CommentItemDto,
  CommentResponseDto,
  CreateCommentDto,
} from './dto'
import {
  CreateSwaggerDecorator,
  GetByIdSwaggerDecorator,
  RemoveSwaggerDecorator,
} from './decorators'
import { ApiTags } from '@nestjs/swagger'
import { CommentEntity } from './entities'

@Controller('comments')
@ApiTags('Comments routes')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @CreateSwaggerDecorator()
  async create(
    @UserInfo('id') currentUserId: number,
    @Body() payload: CreateCommentDto,
  ): Promise<CommentConfirmationResponseDto> {
    const listId = await this.commentService.create(currentUserId, payload)

    return this.buildCommentConfirmationResponse(listId)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
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
  @Delete(':id')
  @RemoveSwaggerDecorator()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo('id') currentUserId: number,
  ): Promise<CommentConfirmationResponseDto> {
    const commentId = await this.commentService.remove(id, currentUserId)

    return this.buildCommentConfirmationResponse(commentId)
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
