import { ApiProperty } from '@nestjs/swagger'

class CommentIdDTO {
  @ApiProperty()
  itemId: number
}

export class CommentConfirmationResponseDto {
  @ApiProperty()
  comment: CommentIdDTO
}
