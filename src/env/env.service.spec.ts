import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'

import { EnvService } from './env.service'

describe('EnvService', () => {
  let envService: EnvService
  let configService: ConfigService
  const apiPort = 1111

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(apiPort),
          },
        },
      ],
    }).compile()

    envService = module.get<EnvService>(EnvService)
    configService = module.get<ConfigService>(ConfigService)
  })

  it('EnvService be defined', () => {
    expect(envService).toBeDefined()
  })

  it('ConfigService should be defined', () => {
    expect(configService).toBeDefined()
  })

  it('the env value should be returned', async () => {
    expect(envService.get('API_PORT')).toEqual(apiPort)

    expect(configService.get).toHaveBeenCalledWith('API_PORT', { infer: true })
  })
})
