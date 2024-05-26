import { ApiProperty } from '@nestjs/swagger'

class CardIdDTO {
  @ApiProperty()
  itemId: number
}

export class CardConfirmationResponseDto {
  @ApiProperty()
  card: CardIdDTO
}
