import { applyDecorators } from '@nestjs/common'

import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UsersResponseDto } from '../dto'

export function GetAllSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get All Users' }),
    ApiResponse({
      status: 200,
      description: 'The found records',
      type: UsersResponseDto,
    }),
  )
}
