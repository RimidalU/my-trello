import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateListDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My List',
    description: 'List Name',
  })
  readonly name: string

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 2,
    description: 'The List position',
  })
  readonly position: number
}
