import { applyDecorators } from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { CardConfirmationResponseDto } from '../dto'

export function CreateSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),

    ApiOperation({ summary: 'Create Card' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiCreatedResponse({
      description: 'Card created',
      type: CardConfirmationResponseDto,
    }),
  )
}
