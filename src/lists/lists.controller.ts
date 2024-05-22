import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ListsService } from './lists.service'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UserInfo } from '@src/users/decorators'
import { CreateListDto } from './dto'
import { ListConfirmationResponseDto } from './dto'
import { CreateSwaggerDecorator } from './decorators'

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

  private buildListConfirmationResponse(
    listId: number,
  ): ListConfirmationResponseDto {
    return {
      list: {
        itemId: listId,
      },
    }
  }
}
