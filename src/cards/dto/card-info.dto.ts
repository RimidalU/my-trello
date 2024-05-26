import { ApiProperty } from '@nestjs/swagger'

export class CardInfoDTO {
  @ApiProperty({
    example: 'Card Example',
    description: 'Card Name',
  })
  readonly name: string

  @ApiProperty({
    example: 'Card description Example',
    description: 'Card description',
  })
  readonly description: string

  @ApiProperty({
    example: '2',
    description: 'Card position on List',
  })
  readonly position: number

  @ApiProperty({
    example: '20.20.2020',
    description: 'List created At',
  })
  readonly createdAt: Date
}
