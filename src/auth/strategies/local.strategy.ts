import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'

import { UserValidatedType } from '../types/user-validated.type'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' })
  }

  async validate(email, password): Promise<UserValidatedType> {
    const user = await this.authService.validateUser({ password, email })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
