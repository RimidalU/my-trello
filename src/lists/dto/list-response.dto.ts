import { ApiProperty } from '@nestjs/swagger'

import { ListItemDto } from './list-item.dto'

export class ListResponseDto {
  @ApiProperty({ isArray: true, type: ListItemDto })
  readonly list: ListItemDto
}
