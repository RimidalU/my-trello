import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { UserService } from '@src/user'

import { ValidateUserDto } from './dto'
import { UserValidatedType } from './types/user-validated.type'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: ValidateUserDto): Promise<UserValidatedType | null> {
    const user = await this.usersService.getByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: UserValidatedType) {
    const payload = { id: user.id, name: user.name, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
