import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@src/users/entities'
import { Repository } from 'typeorm'
import { CardEntity } from './entities'
import { CreateCardDto, UpdateCardDto } from './dto'
import { ListNotFoundException } from '@src/lists/exceptions'
import { ListEntity } from '@src/lists/entities'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    currentUserId: number,
    list: ListEntity,
    payload: CreateCardDto,
  ): Promise<number> {
    const owner = await this.userRepository.findOneBy({ id: currentUserId })

    const newCard = new CardEntity()
    Object.assign(newCard, { ...payload, owner })

    list.cards.push(newCard)

    const card = await this.cardRepository.save(newCard)
    await this.listRepository.save(list)

    return card.id
  }

  async getAllByListId(list: ListEntity): Promise<CardEntity[]> {
    return list.cards
  }

  async getById(id: number): Promise<CardEntity> {
    const card = await this.cardRepository.findOne({
      where: {
        id,
      },
      relations: ['owner', 'comments'],
    })
    if (!card) {
      throw new ListNotFoundException(['id', id])
    }
    return card
  }

  async remove(id: number, currentUserId: number): Promise<number> {
    const entity = await this.getById(id)

    if (entity.owner.id !== currentUserId) {
      throw new NotAcceptableException()
    }

    await this.cardRepository.remove(entity)
    return id
  }

  async update(
    id: number,
    payload: UpdateCardDto,
    currentUserId: number,
    list: ListEntity,
    newList: ListEntity,
  ): Promise<number> {
    const entity = await this.getById(id)

    if (entity.owner.id !== currentUserId) {
      throw new NotAcceptableException()
    }

    Object.assign(entity, payload)

    list.cards.filter((card) => card.id !== id)

    await this.cardRepository.save(entity)
    await this.listRepository.save(list)

    if (newList) {
      newList.cards.push(entity)
      await this.listRepository.save(newList)
    }

    return entity.id
  }

  async getListById(listId: number): Promise<ListEntity> {
    const list = await this.listRepository.findOneBy({ id: listId })
    if (!list) {
      throw new ListNotFoundException(['id', listId])
    }
    return list
  }
}
