import { Test, TestingModule } from '@nestjs/testing'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

describe('CommentsController', () => {
  let controller: CommentsController
  let service: CommentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get<CommentsController>(CommentsController)
    service = module.get(CommentsService)
  })

  it('controller should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('service should be defined', () => {
    expect(service).toBeDefined()
  })
})
