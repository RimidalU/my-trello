import { NotFoundException } from '@nestjs/common'

export class UserNotFoundException extends NotFoundException {
  constructor(payload: [field: string, value: string | number]) {
    super(`User with ${payload[0]} = '${payload[1]}' not found`)
  }
}
