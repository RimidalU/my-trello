import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Get,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CardsService } from './cards.service'
import { JwtAuthGuard } from '@src/auth/strategies/jwt-auth.guard'
import { UserInfo } from '@src/users/decorators'
import {
  CardConfirmationResponseDto,
  CardItemDto,
  CardItemFullDto,
  CardResponseDto,
  CardsResponseDto,
  CreateCardDto,
  UpdateCardDto,
} from './dto'
import {
  CreateSwaggerDecorator,
  GetAllSwaggerDecorator,
  GetByIdSwaggerDecorator,
  RemoveSwaggerDecorator,
  UpdateSwaggerDecorator,
} from './decorators'
import { ListEntity } from '@src/lists/entities'
import { CardEntity } from './entities'
import { UserEntity } from '@src/users/entities'

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
      cards: cards.map((card) => this.buildCardShortResponse(card)),
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @GetByIdSwaggerDecorator()
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CardResponseDto> {
    const cardInfo = await this.cardsService.getById(id)

    return {
      card: this.buildCardFullResponse(cardInfo),
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @RemoveSwaggerDecorator()
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo('id') currentUserId: number,
  ): Promise<CardConfirmationResponseDto> {
    const cardId = await this.cardsService.remove(id, currentUserId)

    return this.buildCardConfirmationResponse(cardId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UpdateSwaggerDecorator()
  async update(
    @UserInfo('id') currentUserId: number,
    @Param('listId') listId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCardDto,
  ): Promise<CardConfirmationResponseDto> {
    let list = null
    let newList = null
    const { newListId, ...newPayload } = payload
    list = await this.checkList(listId)

    if (newListId) {
      newList = await this.checkList(payload.newListId)
    }

    const cardId = await this.cardsService.update(
      id,
      newPayload,
      currentUserId,
      list,
      newList,
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

  private buildCardShortResponse(card: CardEntity): CardItemDto {
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

  private buildCardFullResponse(card: CardEntity): CardItemFullDto {
    const buildCommentOwner = (owner: UserEntity) => {
      return {
        id: owner.id,
        name: owner.name,
      }
    }

    const buildComments = card.comments.map((item) => {
      return {
        id: item.id,
        description: item.description,
        createdAt: item.createdAt,
        owner: buildCommentOwner(item.owner),
      }
    })

    return {
      itemId: card.id,
      item: {
        name: card.name,
        position: card.position,
        description: card.description,
        createdAt: card.createdAt,
      },
      owner: {
        id: card.owner.id,
        name: card.owner.name,
        email: card.owner.email,
        createdAt: card.owner.createdAt,
      },
      comments: buildComments,
    }
  }
}
