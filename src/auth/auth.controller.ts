import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common'
import { LocalAuthGuard } from './strategies'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'

import { LoginResponseDto, ValidateUserDto } from './dto'
import { LoginSwaggerDecorator } from './decorators'

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @LoginSwaggerDecorator()
  async login(
    @Body() createUserDto: ValidateUserDto,
    @Request() req,
  ): Promise<LoginResponseDto> {
    return this.authService.login(req.user)
  }
}
