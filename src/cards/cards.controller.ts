import { Body, Controller, Param, Post, UseGuards, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CardsService } from './cards.service'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UserInfo } from '@src/users/decorators'
import {
  CardConfirmationResponseDto,
  CardItemDto,
  CardsResponseDto,
  CreateCardDto,
} from './dto'
import { CreateSwaggerDecorator, GetAllSwaggerDecorator } from './decorators'
import { ListEntity } from '@src/lists/entities'
import { CardEntity } from './entities'

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
    const list = await this.checkList(listId)

    const cardId = await this.cardsService.create(currentUserId, list, payload)

    return this.buildCardConfirmationResponse(cardId)
  }

  private async checkList(listId: number): Promise<ListEntity> {
    return await this.cardsService.checkList(listId)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @GetAllSwaggerDecorator()
  async getAllByListId(
    @Param('listId') listId: number,
  ): Promise<CardsResponseDto> {
    const list = await this.checkList(listId)

    const cards = await this.cardsService.getAllByListId(list)

    return {
      cards: cards.map((card) => this.buildCardResponse(card)),
    }
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

  private buildCardResponse(card: CardEntity): CardItemDto {
    return {
      itemId: card.id,
      item: {
        name: card.name,
        position: card.position,
        description: card.description,
        createdAt: card.createdAt,
      },
    }
  }
}
