import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, ApiProperty } from '@nestjs/swagger';

interface ApiCustomResponseOptions<TModel> {
  model: Type<TModel>; 
  isArray?: boolean;
  statusCode?: number;
  message?: string;
}

export function ApiCustomResponse<TModel>({
  model,
  isArray = false,
  statusCode = 200,
  message = 'Server Response Success',
}: ApiCustomResponseOptions<TModel>) {
  class CustomResponseClass {
    @ApiProperty({ example: statusCode })
    statusCode: number;

    @ApiProperty({ example: message })
    message: string;

    @ApiProperty({ type: isArray ? [model] : model })
    data: TModel | TModel[];
  }

  return applyDecorators(
    ApiResponse({
      status: statusCode,
      description: message,
      type: CustomResponseClass,
    }),
  );
}
