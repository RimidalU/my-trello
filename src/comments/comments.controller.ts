import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UserInfo } from '@src/users/decorators'
import { CommentConfirmationResponseDto, CreateCommentDto } from './dto'
import { CreateSwaggerDecorator } from './decorators'
import { ApiTags } from '@nestjs/swagger'

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

  private buildCommentConfirmationResponse(
    commentId: number,
  ): CommentConfirmationResponseDto {
    return {
      comment: {
        itemId: commentId,
      },
    }
  }
}
