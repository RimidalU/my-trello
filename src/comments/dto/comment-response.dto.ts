import { ApiProperty } from '@nestjs/swagger'
import { CommentItemDto } from './comment-item.dto'

export class CommentResponseDto {
  @ApiProperty()
  readonly comment: CommentItemDto
}
