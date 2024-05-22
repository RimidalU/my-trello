import { applyDecorators } from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { ListConfirmationResponseDto } from '../dto'

export function CreateSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),

    ApiOperation({ summary: 'Create List of Cards' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiCreatedResponse({
      description: 'List created',
      type: ListConfirmationResponseDto,
    }),
  )
}
