import { applyDecorators } from '@nestjs/common'

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { CardsResponseDto } from '../dto'

export function GetAllSwaggerDecorator() {
  return applyDecorators(
    ApiBearerAuth(),

    ApiOperation({ summary: 'Get All Cards by List Id' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiResponse({
      status: 200,
      description: 'The found records',
      type: CardsResponseDto,
    }),
  )
}
