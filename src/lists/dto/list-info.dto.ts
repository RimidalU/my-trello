import { ApiProperty } from '@nestjs/swagger'

export class ListInfoDTO {
  @ApiProperty({
    example: 'User Example',
    description: 'User Name',
  })
  readonly name: string

  @ApiProperty({
    example: '2',
    description: 'List position on board',
  })
  readonly position: number

  @ApiProperty({
    example: '20.20.2020',
    description: 'List created At',
  })
  readonly createdAt: Date
}
