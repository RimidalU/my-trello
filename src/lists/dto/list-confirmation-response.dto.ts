import { ApiProperty } from '@nestjs/swagger'

class ListIdDTO {
  @ApiProperty()
  itemId: number
}

export class ListConfirmationResponseDto {
  @ApiProperty()
  list: ListIdDTO
}
