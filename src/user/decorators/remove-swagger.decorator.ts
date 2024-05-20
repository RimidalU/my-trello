import { applyDecorators } from '@nestjs/common'

import {
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'

import { UserConfirmationResponseDto } from '@src/user/dto'

export function RemoveSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove User' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiNotAcceptableResponse({ description: 'Not Acceptable' }),
    ApiResponse({
      status: 200,
      description: 'User removed',
      type: UserConfirmationResponseDto,
    }),
  )
}
