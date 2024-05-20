import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from '@src/user/user.service'
import { UserEntity } from './entities'
import { UserItemDto } from './dto'

@Controller('user')
@ApiTags('User routes')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private buildUserResponse(user: UserEntity): UserItemDto {
    return {
      itemId: user.id,
      item: {
        name: user.name,
        email: user.email,
      },
    }
  }
}
