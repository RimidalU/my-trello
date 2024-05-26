import { applyDecorators } from '@nestjs/common'

import {
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { CommentConfirmationResponseDto } from '../dto'

export function RemoveSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),

    ApiOperation({ summary: 'Remove Comment' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiNotAcceptableResponse({ description: 'Not Acceptable' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiResponse({
      status: 200,
      description: 'Comment removed',
      type: CommentConfirmationResponseDto,
    }),
  )
}
