import { ApiProperty } from "@nestjs/swagger";

export class DepartmentResponseDTO {
    @ApiProperty({ example: "6736cb3bb9a808891d124fa0" })
    _id: string;

    @ApiProperty({ example: "Phòng Họp" })
    name: String;

    @ApiProperty({ example: "The description department" })
    description: String;

    @ApiProperty({ example: true })
    isActive: Boolean;

    @ApiProperty({ example: new Date().toISOString() })
    createAt?: Date;

    @ApiProperty({ example: new Date().toISOString() })
    updateAt?: Date;
}