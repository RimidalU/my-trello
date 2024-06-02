import { IsEmail, IsOptional, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'User Example',
    description: 'User Name',
  })
  readonly name: string

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    uniqueItems: true,
    example: 'example@email.com',
    description: 'User Email',
  })
  readonly email: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'example#Password91',
    description: 'Strong Password',
  })
  readonly password?: string
}
