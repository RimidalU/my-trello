import { Controller, Post, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './strategies'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login() {}
}
