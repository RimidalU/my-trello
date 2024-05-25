import { ApiProperty } from '@nestjs/swagger'

export class CommentOwnerInfoDTO {
  @ApiProperty({
    example: '11',
    description: 'List owner id',
  })
  readonly id: number

  @ApiProperty({
    example: 'User Example',
    description: 'User Name',
  })
  readonly name: string
}
