import { IsNotEmpty, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My Comment',
    description: 'Comment',
  })
  readonly description: string
}
