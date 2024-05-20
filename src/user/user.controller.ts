import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'

import { UserService } from '@src/user/user.service'

import { ApiTags } from '@nestjs/swagger'
import { UserEntity } from './entities'
import { UserItemDto, UserResponseDto, UsersResponseDto } from './dto'
import { GetAllSwaggerDecorator, GetByIdSwaggerDecorator } from './decorators'

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

  @Get(':id')
  @GetByIdSwaggerDecorator()
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const userInfo = await this.userService.getById(id)

    return {
      user: this.buildUserResponse(userInfo),
    }
  }
}
