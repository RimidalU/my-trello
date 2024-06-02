import { Test, TestingModule } from '@nestjs/testing'
import { CardsController } from './cards.controller'
import { CardsService } from './cards.service'

describe('CardsController', () => {
  let controller: CardsController
  let service: CardsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get<CardsController>(CardsController)
    service = module.get(CardsService)
  })

  it('controller should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('service should be defined', () => {
    expect(service).toBeDefined()
  })
})
