import { IsNumber, IsOptional, IsString } from 'class-validator'

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateCardDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 2,
    description: 'The List id',
  })
  readonly newListId?: number

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'My Card',
    description: 'Card Name',
  })
  readonly name: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'My Card description',
    description: 'Card description',
  })
  readonly description: string

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 2,
    description: 'The List position',
  })
  readonly position: number
}
