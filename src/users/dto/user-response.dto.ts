import { UserItemDto } from '@src/users/dto/user-item.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty()
  user: UserItemDto
}
