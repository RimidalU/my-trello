import { Test, TestingModule } from '@nestjs/testing'
import { ListsController } from './lists.controller'
import { ListsService } from './lists.service'
import { listItem, listItemResponse, newItemInfo } from './mocks'
import { NotAcceptableException } from '@nestjs/common/exceptions'

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
        lists: [listItemResponse],
      })

      expect(service.getAll).toHaveBeenCalledWith()
    })
  })

  describe('getById list method', () => {
    it('check returned list with current id', async () => {
      expect(await controller.getById(listItem.id)).toEqual({
        list: listItemResponse,
      })

      expect(service.getById).toHaveBeenCalledWith(listItem.id)
    })
  })

  describe('remove list method', () => {
    it('check returned NotAcceptableException', async () => {
      await expect(
        controller.remove(listItem.id, currentUserId),
      ).rejects.toThrow(NotAcceptableException)
    })

    it('check returned list id', async () => {
      expect(await controller.remove(listItem.id, listItem.owner.id)).toEqual({
        list: {
          itemId: listItem.id,
        },
      })

      expect(service.remove).toHaveBeenCalledWith(listItem.id)
    })
  })

  describe('update list method', () => {
    it('check returned NotAcceptable Exception', async () => {
      await expect(
        controller.update(listItem.id, newItemInfo, currentUserId),
      ).rejects.toThrow(NotAcceptableException)
    })

    it('check returned updated list with current id', async () => {
      expect(
        await controller.update(listItem.id, newItemInfo, listItem.owner.id),
      ).toEqual({
        list: {
          itemId: listItem.id,
        },
      })

      expect(service.update).toHaveBeenCalledWith(listItem.id, newItemInfo)
    })
  })
})
