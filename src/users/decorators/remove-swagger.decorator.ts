import { applyDecorators } from '@nestjs/common'

import {
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { UserConfirmationResponseDto } from '@src/users/dto'

export function RemoveSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),

    ApiOperation({ summary: 'Remove User' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiNotAcceptableResponse({ description: 'Not Acceptable' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiResponse({
      status: 200,
      description: 'User removed',
      type: UserConfirmationResponseDto,
    }),
  )
}
