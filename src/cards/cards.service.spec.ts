import { Test, TestingModule } from '@nestjs/testing'
import { CardsService } from './cards.service'
import { Repository } from 'typeorm'
import { UserEntity } from '@src/users/entities'
import { CardEntity } from './entities'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ListEntity } from '@src/lists/entities'

describe('CardsService', () => {
  let service: CardsService
  let userRepository: Repository<UserEntity>
  let cardRepository: Repository<CardEntity>
  let listRepository: Repository<ListEntity>

  const CARD_REPOSITORY_TOKEN = getRepositoryToken(CardEntity)
  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity)
  const LIST_REPOSITORY_TOKEN = getRepositoryToken(ListEntity)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: CARD_REPOSITORY_TOKEN,
          useValue: {},
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {},
        },
        {
          provide: LIST_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<CardsService>(CardsService)
    userRepository = module.get(USER_REPOSITORY_TOKEN)
    cardRepository = module.get(CARD_REPOSITORY_TOKEN)
    listRepository = module.get(LIST_REPOSITORY_TOKEN)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should userRepository be defined', () => {
    expect(userRepository).toBeDefined()
  })

  it('should cardRepository be defined', () => {
    expect(cardRepository).toBeDefined()
  })

  it('should cardRepository be defined', () => {
    expect(listRepository).toBeDefined()
  })
})
