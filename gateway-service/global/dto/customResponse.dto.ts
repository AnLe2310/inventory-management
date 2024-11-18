import { ApiProperty } from '@nestjs/swagger';

export class CustomResponseDTO<T> {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Server Response Success' })
    message: string;

    @ApiProperty({ type: Object, description: 'Data returned by the API' })
    data: T;
}
