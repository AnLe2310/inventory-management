import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, ApiProperty } from '@nestjs/swagger';

interface ApiCustomResponseOptions<TModel> {
    model: Type<TModel>; isArray?: boolean; description?: string; statusCode?: number;
}

// Hàm helper
export function ApiCustomResponse<TModel>({
    model,
    isArray = false,
    description = 'Successful response',
    statusCode = 200,
}: ApiCustomResponseOptions<TModel>) {
    class CustomResponseClass {
        @ApiProperty({ example: statusCode })
        statusCode: number;

        @ApiProperty({ example: 'Server Response Success' })
        message: string;

        @ApiProperty({ type: isArray ? [model] : model })
        data: TModel | TModel[];
    }

    return applyDecorators(
        ApiResponse({
            status: statusCode,
            description,
            type: CustomResponseClass,
        }),
    );
}
