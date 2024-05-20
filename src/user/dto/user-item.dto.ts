import { ApiProperty } from '@nestjs/swagger'

class UserInfo {
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
}

export class UserItemDto {
  @ApiProperty({
    example: '11',
    description: 'User id',
  })
  readonly itemId: number

  @ApiProperty()
  readonly item: UserInfo
}
