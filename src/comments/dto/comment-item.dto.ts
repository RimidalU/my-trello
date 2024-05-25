import { ApiProperty } from '@nestjs/swagger'
import { CommentOwnerInfoDTO } from './comment-owner-info.dto'
import { CommentInfoDTO } from './comment-info.dto'

export class CommentItemDto {
  @ApiProperty({
    example: '11',
    description: 'Comment id',
  })
  readonly itemId: number

  @ApiProperty()
  readonly item: CommentInfoDTO

  @ApiProperty()
  readonly owner: CommentOwnerInfoDTO
}
