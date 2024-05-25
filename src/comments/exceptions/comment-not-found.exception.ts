import { NotFoundException } from '@nestjs/common'

export class CommentNotFoundException extends NotFoundException {
  constructor(payload: [field: string, value: string | number]) {
    super(`Comment with ${payload[0]} = '${payload[1]}' not found`)
  }
}
