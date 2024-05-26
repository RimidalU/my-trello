import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My Card',
    description: 'Card Name',
  })
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My Card description',
    description: 'Card description',
  })
  readonly description: string

  @IsNumber()
  @ApiPropertyOptional({
    example: 2,
    description: 'The List position',
  })
  readonly position: number
}
