import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, ApiProperty } from '@nestjs/swagger';
import * as crypto from 'crypto';

interface ApiCustomResponseOptions<TModel> {
  model: Type<TModel>;
  isArray?: boolean;
  statusCode?: number;
  message?: string;
}

function createResponseType<TModel>(model: Type<TModel>, isArray: boolean, statusCode: number, message: string) {
  class CR {
    @ApiProperty({ example: statusCode })
    statusCode: number;

    @ApiProperty({ example: message })
    message: string;

    @ApiProperty({ type: isArray ? [model] : model })
    data: TModel | TModel[];
  }

  Object.defineProperty(CR, 'name', { value: `CR${crypto.randomBytes(4).toString('hex')}` });

  return CR;
}

export function ApiCustomResponse<TModel>({
  model,
  isArray = false,
  statusCode = 200,
  message = 'Server Response Success',
}: ApiCustomResponseOptions<TModel>) {
  const ResponseType = createResponseType(model, isArray, statusCode, message);

  return applyDecorators(
    ApiResponse({
      status: statusCode,
      type: ResponseType,
    }),
  );
}