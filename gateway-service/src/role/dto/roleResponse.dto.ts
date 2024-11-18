import { ApiProperty } from "@nestjs/swagger";

export class RoleResponseDTO {
    @ApiProperty({example: "6738cf2c78d8f182314b516c"})
    _id: number;

    @ApiProperty({ example: "admin" })
    name: string;

    @ApiProperty({ example: "The description role" })
    description: string;

    @ApiProperty({ example: new Date().toISOString() })
    createAt: Date;

    @ApiProperty({ example: new Date().toISOString() })
    updateAt: Date;
}