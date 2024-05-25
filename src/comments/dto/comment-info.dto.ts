import { ApiProperty } from '@nestjs/swagger'

export class CommentInfoDTO {
  @ApiProperty({
    example: 'Comment description',
    description: 'Description of Comment',
  })
  readonly description: string

  @ApiProperty({
    example: '20.20.2020',
    description: 'Description created At',
  })
  readonly createdAt: Date
}
