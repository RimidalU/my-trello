import { NotFoundException } from '@nestjs/common'

export class CardNotFoundException extends NotFoundException {
  constructor(payload: [field: string, value: string | number]) {
    super(`Card with ${payload[0]} = '${payload[1]}' not found`)
  }
}
