import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common'
import { ListsService } from './lists.service'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UserInfo } from '@src/users/decorators'
import { CreateListDto, ListItemDto, ListsResponseDto } from './dto'
import { ListConfirmationResponseDto } from './dto'
import { CreateSwaggerDecorator, GetAllSwaggerDecorator } from './decorators'
import { ListEntity } from './entities'

@Controller('lists')
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
