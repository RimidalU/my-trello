import { ApiProperty } from '@nestjs/swagger'
import { CardItemDto } from './card-item.dto'

export class CardsResponseDto {
  @ApiProperty({ isArray: true, type: CardItemDto })
  readonly cards: CardItemDto[]
}
