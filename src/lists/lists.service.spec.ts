import { Test, TestingModule } from '@nestjs/testing'
import { ListsService } from './lists.service'
import { Repository } from 'typeorm'
import { ListEntity } from './entities'
import { getRepositoryToken } from '@nestjs/typeorm'
import { listItem, newItemInfo, owner } from './mocks'
import { UserEntity } from '@src/users/entities'

describe('ListsService', () => {
  let service: ListsService
  let listRepository: Repository<ListEntity>
  let userRepository: Repository<UserEntity>
  const currentUserId = 1

  const LIST_REPOSITORY_TOKEN = getRepositoryToken(ListEntity)
  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        {
          provide: LIST_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn().mockReturnValue(listItem),
            find: jest.fn().mockReturnValue([listItem]),
            findOneBy: jest.fn().mockReturnValue(listItem),
            remove: jest.fn().mockReturnValue(listItem),
          },
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOneBy: jest.fn().mockReturnValue(owner),
          },
        },
      ],
    }).compile()

    service = module.get<ListsService>(ListsService)
    userRepository = module.get(USER_REPOSITORY_TOKEN)
    listRepository = module.get(LIST_REPOSITORY_TOKEN)
  })

  it('service should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should listRepository be defined', () => {
    expect(listRepository).toBeDefined()
  })

  it('should bookRepository be defined', () => {
    expect(userRepository).toBeDefined()
  })

  describe('getAll lists method', () => {
    it('the array of lists should be returned', async () => {
      expect(await service.getAll()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...listItem,
          }),
        ]),
      )

      expect(listRepository.find).toHaveBeenCalledWith({ relations: ['owner'] })
    })
  })

  describe('create list method', () => {
    it('check the list created', async () => {
      expect(await service.create(currentUserId, newItemInfo)).toBe(listItem.id)
      expect(listRepository.save).toHaveBeenCalledWith({
        name: listItem.name,
        owner: {
          createdAt: listItem.owner.createdAt,
          email: listItem.owner.email,
          id: listItem.owner.id,
          name: listItem.owner.name,
          password: listItem.owner.password,
        },
        position: 2,
      })
    })
  })
})
