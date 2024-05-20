import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }
}
