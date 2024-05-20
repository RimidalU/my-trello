import { applyDecorators } from '@nestjs/common'

import { ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { UserResponseDto } from '@src/user/dto'

export function GetByIdSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get User by id' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiResponse({
      status: 200,
      description: 'The found record',
      type: UserResponseDto,
    }),
  )
}
