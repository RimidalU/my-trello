import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '@src/users/entities'
import { Repository } from 'typeorm'
import { ListEntity } from './entities'
import { CreateListDto } from './dto'

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
}
