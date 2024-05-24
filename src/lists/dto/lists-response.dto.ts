import { ApiProperty } from '@nestjs/swagger'

import { ListItemDto } from './list-item.dto'

export class ListsResponseDto {
  @ApiProperty({ isArray: true, type: ListItemDto })
  readonly lists: ListItemDto[]
}
