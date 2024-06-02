import { ApiProperty } from '@nestjs/swagger'
import { CommentItemDto } from './comment-item.dto'

export class CommentsResponseDto {
  @ApiProperty({ isArray: true, type: CommentItemDto })
  readonly comments: CommentItemDto[]
}
