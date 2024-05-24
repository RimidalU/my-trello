import { ApiProperty } from '@nestjs/swagger'
import { ListOwnerInfoDTO } from './list-owner-info.dto'
import { ListInfoDTO } from './list-info.dto'

export class ListItemDto {
  @ApiProperty({
    example: '11',
    description: 'List id',
  })
  readonly itemId: number

  @ApiProperty()
  readonly item: ListInfoDTO

  @ApiProperty()
  readonly owner: ListOwnerInfoDTO
}
