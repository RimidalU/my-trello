import { Controller, Get } from '@nestjs/common'

import { UserService } from '@src/user/user.service'

import { ApiTags } from '@nestjs/swagger'
import { UserEntity } from './entities'
import { UserItemDto, UsersResponseDto } from './dto'
import { GetAllSwaggerDecorator } from './decorators'

@Controller('user')
@ApiTags('User routes')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GetAllSwaggerDecorator()
  async getAll(): Promise<UsersResponseDto> {
    const users = await this.userService.getAll()

    return {
      users: users.map((user) => this.buildUserResponse(user)),
    }
  }

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
