import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '@src/users/entities'

import { ListNotFoundException } from './exceptions'
import { ListEntity } from './entities'
import { CreateListDto, UpdateListDto } from './dto'

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(currentUserId: number, payload: CreateListDto): Promise<number> {
    const owner = await this.userRepository.findOneBy({ id: currentUserId })

    const newList = new ListEntity()
    Object.assign(newList, { ...payload, owner })

    const list = await this.listRepository.save(newList)
    return list.id
  }

  async getAll(): Promise<ListEntity[]> {
    const lists = await this.listRepository.find({
      relations: ['owner'],
    })
    return lists
  }

  async getById(id: number): Promise<ListEntity> {
    const list = await this.listRepository.findOne({
      where: {
        id,
      },
      relations: ['owner'],
    })
    if (!list) {
      throw new ListNotFoundException(['id', id])
    }
    return list
  }

  async remove(id: number): Promise<number> {
    const list = await this.getById(id)
    await this.listRepository.remove(list)
    return id
  }

  async update(
    id: number,
    payload: UpdateListDto,
    currentUserId: number,
  ): Promise<number> {
    const entity = await this.getById(id)

    if (entity.owner.id !== currentUserId) {
      throw new NotAcceptableException()
    }

    Object.assign(entity, payload)

    await this.listRepository.save(entity)
    return entity.id
  }
}
