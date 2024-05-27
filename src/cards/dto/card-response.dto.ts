import { ApiProperty } from '@nestjs/swagger'

import { CardItemDto } from './card-item.dto'

export class CardResponseDto {
  @ApiProperty()
  readonly card: CardItemDto
}
