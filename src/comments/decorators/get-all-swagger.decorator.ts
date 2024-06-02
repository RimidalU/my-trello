import { applyDecorators } from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { CommentsResponseDto } from '../dto'

export function GetAllSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),

    ApiOperation({ summary: 'Get All Comments by Card Id' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiResponse({
      status: 200,
      description: 'The found records',
      type: CommentsResponseDto,
    }),
  )
}
