import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  NotAcceptableException,
  Patch,
} from '@nestjs/common'
import { ListsService } from './lists.service'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UserInfo } from '@src/users/decorators'
import {
  CreateListDto,
  ListItemDto,
  ListsResponseDto,
  ListResponseDto,
  ListConfirmationResponseDto,
  UpdateListDto,
} from './dto'
import {
  CreateSwaggerDecorator,
  GetAllSwaggerDecorator,
  GetByIdSwaggerDecorator,
  RemoveSwaggerDecorator,
  UpdateSwaggerDecorator,
} from './decorators'
import { ListEntity } from './entities'
import { ApiTags } from '@nestjs/swagger'

@Controller('lists')
@ApiTags('Lists routes')
export class ListsController {
  constructor(private readonly listService: ListsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @CreateSwaggerDecorator()
  async create(
    @UserInfo('id') currentUserId: number,
    @Body() payload: CreateListDto,
  ): Promise<ListConfirmationResponseDto> {
    const listId = await this.listService.create(currentUserId, payload)

    return this.buildListConfirmationResponse(listId)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @GetAllSwaggerDecorator()
  async getAll(): Promise<ListsResponseDto> {
    const lists = await this.listService.getAll()

    return {
      lists: lists.map((list) => this.buildListResponse(list)),
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @GetByIdSwaggerDecorator()
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ListResponseDto> {
    const listInfo = await this.listService.getById(id)

    return {
      list: this.buildListResponse(listInfo),
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @RemoveSwaggerDecorator()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo('id') currentUserId: number,
  ): Promise<ListConfirmationResponseDto> {
    const listInfo = await this.listService.getById(id)

    if (listInfo.owner.id !== currentUserId) {
      throw new NotAcceptableException()
    }

    const listId = await this.listService.remove(id)

    return this.buildListConfirmationResponse(listId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UpdateSwaggerDecorator()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateListDto,
    @UserInfo('id') currentUserId: number,
  ): Promise<ListConfirmationResponseDto> {
    const listId = await this.listService.update(id, payload, currentUserId)

    return this.buildListConfirmationResponse(listId)
  }

  private buildListConfirmationResponse(
    listId: number,
  ): ListConfirmationResponseDto {
    return {
      list: {
        itemId: listId,
      },
    }
  }

  private buildListResponse(list: ListEntity): ListItemDto {
    return {
      itemId: list.id,
      item: {
        name: list.name,
        position: list.position,
        createdAt: list.createdAt,
      },
      owner: {
        id: list.owner.id,
        name: list.owner.name,
        email: list.owner.email,
        createdAt: list.owner.createdAt,
      },
    }
  }
}
