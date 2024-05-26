import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CardsService } from './cards.service'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UserInfo } from '@src/users/decorators'
import { CardConfirmationResponseDto, CreateCardDto } from './dto'
import { CreateSwaggerDecorator } from './decorators'

@Controller('lists/:listId/cards')
@ApiTags('Cards routes')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @CreateSwaggerDecorator()
  async create(
    @UserInfo('id') currentUserId: number,
    @Param('listId') listId: number,
    @Body() payload: CreateCardDto,
  ): Promise<CardConfirmationResponseDto> {
    const cardId = await this.cardsService.create(
      currentUserId,
      listId,
      payload,
    )

    return this.buildCardConfirmationResponse(cardId)
  }

  private buildCardConfirmationResponse(
    cardId: number,
  ): CardConfirmationResponseDto {
    return {
      card: {
        itemId: cardId,
      },
    }
  }
}
