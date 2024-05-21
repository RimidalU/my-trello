import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
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
  RemoveSwaggerDecorator,
  UpdateSwaggerDecorator,
  UserInfo,
} from './decorators'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
@ApiTags('Users routes')
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

  @UseGuards(JwtAuthGuard)
  @Get()
  @GetAllSwaggerDecorator()
  async getAll(): Promise<UsersResponseDto> {
    const users = await this.userService.getAll()

    return {
      users: users.map((user) => this.buildUserResponse(user)),
    }
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @RemoveSwaggerDecorator()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo('id') currentUserId: number,
  ): Promise<UserConfirmationResponseDto> {
    if (id !== currentUserId) {
      throw new NotAcceptableException()
    }

    const userId = await this.userService.remove(id)

    return this.buildUserConfirmationResponse(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UpdateSwaggerDecorator()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
    @UserInfo('id') currentUserId: number,
  ): Promise<UserConfirmationResponseDto> {
    if (id !== currentUserId) {
      throw new NotAcceptableException()
    }

    const userId = await this.userService.update(id, payload)

    return this.buildUserConfirmationResponse(userId)
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
