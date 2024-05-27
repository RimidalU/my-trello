import { ApiProperty } from '@nestjs/swagger'

import { CardInfoDTO } from './card-info.dto'
import { CardOwnerInfoDTO } from './card-owner-info.dto'
import { CardCommentsInfoDto } from './card-comments-info.dto'

export class CardItemFullDto {
  @ApiProperty({
    example: '11',
    description: 'Card id',
  })
  readonly itemId: number

  @ApiProperty()
  readonly item: CardInfoDTO

  @ApiProperty()
  readonly owner: CardOwnerInfoDTO

  @ApiProperty()
  readonly comments: CardCommentsInfoDto
}
