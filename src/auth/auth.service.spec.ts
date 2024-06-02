import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '@src/users'
import { userItem } from '@src/users/mocks'

describe('AuthService', () => {
  let service: AuthService
  let userService: UserService
  let jwtService: JwtService
  const mockJwtToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsIm5hbWUiOiJVc2VyIE5hbWUiLCJlbWFpbCI6InVzZXJAZWRkbWFpbC5jb20iLCJpYXQiOjE3MTE5NjA4NjcsImV4cCI6MTcxMTk2MDkyN30.8Kqn3HGIkTdUKlluAyvGydTw2azL22trL6lzwFWtjO4'

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getByEmail: jest.fn().mockReturnValue(userItem),
          },
        },
        JwtService,
        {
          provide: JwtService,
          useValue: {
            secret: process.env.JWT_CONSTANTS_SECRET,
            sign: jest.fn().mockReturnValue(mockJwtToken),
          },
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    userService = module.get(UserService)
    jwtService = module.get(JwtService)
  })

  it('AuthService should be defined', () => {
    expect(service).toBeDefined()
  })

  it('UserService should be defined', () => {
    expect(userService).toBeDefined()
  })

  it('jwtService should be defined', () => {
    expect(jwtService).toBeDefined()
  })
})
