import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My List',
    description: 'User Name',
  })
  readonly name: string

  @IsNumber()
  @ApiPropertyOptional({
    example: 2,
    description: 'The List position',
  })
  readonly position: number
}
