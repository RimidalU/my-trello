import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'

import { UserService } from '@src/user/user.service'

import { ApiTags } from '@nestjs/swagger'
import { UserEntity } from './entities'
import {
  CreateUserDto,
  UserConfirmationResponseDto,
  UserItemDto,
  UserResponseDto,
  UsersResponseDto,
} from './dto'
import {
  CreateSwaggerDecorator,
  GetAllSwaggerDecorator,
  GetByIdSwaggerDecorator,
} from './decorators'

@Controller('user')
@ApiTags('User routes')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CreateSwaggerDecorator()
  async create(
    @Body() payload: CreateUserDto,
  ): Promise<UserConfirmationResponseDto> {
    const userId = await this.userService.create(payload)

    return this.buildUserConfirmationResponse(userId)
  }

  @Get()
  @GetAllSwaggerDecorator()
  async getAll(): Promise<UsersResponseDto> {
    const users = await this.userService.getAll()

    return {
      users: users.map((user) => this.buildUserResponse(user)),
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

  private buildUserResponse(user: UserEntity): UserItemDto {
    return {
      itemId: user.id,
      item: {
        name: user.name,
        email: user.email,
      },
    }
  }

  private buildUserConfirmationResponse(
    userId: number,
  ): UserConfirmationResponseDto {
    return {
      user: {
        itemId: userId,
      },
    }
  }
}
