import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { UserEntity } from './entities'
import { Repository } from 'typeorm'
import { UserNotCreatedException, UserNotFoundException } from './exceptions'
import { CreateUserDto } from './dto'

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async getById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new UserNotFoundException({ id })
    }
    return user
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email })
    if (!user) {
      throw new UserNotFoundException({ email })
    }
    return user
  }

  async create(payload: CreateUserDto): Promise<number> {
    const newUser = new UserEntity()
    Object.assign(newUser, payload)

    try {
      const user = await this.userRepository.save(newUser)
      return user.id
    } catch {
      throw new UserNotCreatedException(payload.email)
    }
  }
}
