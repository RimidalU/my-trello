import { Test, TestingModule } from '@nestjs/testing'
import { CommentsService } from './comments.service'
import { Repository } from 'typeorm'
import { CardEntity } from '@src/cards/entities'
import { UserEntity } from '@src/users/entities'
import { CommentEntity } from './entities'
import { owner } from '@src/lists/mocks'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('CommentsService', () => {
  let service: CommentsService
  let commentRepository: Repository<CommentEntity>
  let userRepository: Repository<UserEntity>
  let cardRepository: Repository<CardEntity>

  const CARD_REPOSITORY_TOKEN = getRepositoryToken(CardEntity)
  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity)
  const COMMENT_REPOSITORY_TOKEN = getRepositoryToken(CommentEntity)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOneBy: jest.fn().mockReturnValue(owner),
          },
        },
        {
          provide: COMMENT_REPOSITORY_TOKEN,
          useValue: {},
        },
        {
          provide: CARD_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<CommentsService>(CommentsService)
    userRepository = module.get(USER_REPOSITORY_TOKEN)
    cardRepository = module.get(CARD_REPOSITORY_TOKEN)
    commentRepository = module.get(COMMENT_REPOSITORY_TOKEN)
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

  it('should commentRepository be defined', () => {
    expect(commentRepository).toBeDefined()
  })
})
