import { ApiProperty } from '@nestjs/swagger'

import { CardInfoDTO } from './card-info.dto'

export class CardItemDto {
  @ApiProperty({
    example: '11',
    description: 'Card id',
  })
  readonly itemId: number

  @ApiProperty()
  readonly item: CardInfoDTO
}
