import { ApiProperty } from '@nestjs/swagger'

export class ListOwnerInfoDTO {
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

  @ApiProperty({
    uniqueItems: true,
    example: 'example@email.com',
    description: 'User Email',
  })
  readonly email: string

  @ApiProperty({
    example: '20.20.2020',
    description: 'List created At',
  })
  readonly createdAt: Date
}
