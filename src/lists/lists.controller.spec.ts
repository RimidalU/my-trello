import { Test, TestingModule } from '@nestjs/testing'
import { ListsController } from './lists.controller'
import { ListsService } from './lists.service'
import { listItem, newItemInfo } from './mocks'

describe('ListsController', () => {
  let controller: ListsController
  let service: ListsService
  const currentUserId = 1

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
      providers: [
        {
          provide: ListsService,
          useValue: {
            create: jest.fn().mockReturnValue(listItem.id),
            getAll: jest.fn().mockReturnValue([listItem]),
            getById: jest.fn().mockReturnValue(listItem),
            remove: jest.fn().mockReturnValue(listItem.id),
            update: jest.fn().mockReturnValue(listItem.id),
          },
        },
      ],
    }).compile()

    controller = module.get<ListsController>(ListsController)
    service = module.get(ListsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('service should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create list method', () => {
    it('check the list created', async () => {
      expect(await controller.create(currentUserId, newItemInfo)).toEqual({
        list: {
          itemId: listItem.id,
        },
      })

      expect(service.create).toHaveBeenCalledWith(currentUserId, {
        ...newItemInfo,
      })
    })
  })

  describe('get all lists method', () => {
    it('check returned array of lists', async () => {
      expect(await controller.getAll()).toEqual({
        lists: [
          {
            itemId: listItem.id,
            item: {
              name: listItem.name,
              position: listItem.position,
              createdAt: listItem.createdAt,
            },
            owner: {
              id: listItem.owner.id,
              name: listItem.owner.name,
              email: listItem.owner.email,
              createdAt: listItem.owner.createdAt,
            },
          },
        ],
      })

      expect(service.getAll).toHaveBeenCalledWith()
    })
  })
})
