import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDTO {
    @ApiProperty({ example: "67355face20f610c21fb52f8" })
    _id: string;

    @ApiProperty({ example: "admin" })
    username: string;

    @ApiProperty({ example: "admin@example.com" })
    email: string;

    @ApiProperty({ example: "123" })
    password: string;

    @ApiProperty({ example: "6738cf2c78d8f182314b516c" })
    roleId: string;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: new Date().toISOString() })
    createdAt: string;

    @ApiProperty({ example: new Date().toISOString() })
    updatedAt: string;
}