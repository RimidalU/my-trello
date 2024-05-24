import { NotFoundException } from '@nestjs/common'

export class ListNotFoundException extends NotFoundException {
  constructor(payload: [field: string, value: string | number]) {
    super(`List with ${payload[0]} = '${payload[1]}' not found`)
  }
}
