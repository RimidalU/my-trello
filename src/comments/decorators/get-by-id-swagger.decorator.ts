import { applyDecorators } from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { CommentResponseDto } from '../dto'

export function GetByIdSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),

    ApiOperation({ summary: 'Get Comment by id' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiResponse({
      status: 200,
      description: 'The found record',
      type: CommentResponseDto,
    }),
  )
}