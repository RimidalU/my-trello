import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'User Example',
    description: 'User Name',
  })
  readonly name: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    uniqueItems: true,
    example: 'example@email.com',
    description: 'User Email',
  })
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example#Password91',
    description: 'Strong Password',
  })
  readonly password: string
}
