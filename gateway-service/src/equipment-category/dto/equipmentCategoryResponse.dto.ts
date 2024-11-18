import { ApiProperty } from "@nestjs/swagger";

export class EquipmentCategoryResponseDTO {
    @ApiProperty({ example: "6736f5d65dad13c26754b0d9" })
    _id: string;

    @ApiProperty({ example: "Laptop" })
    name: String;

    @ApiProperty({ example: "The description category" })
    description: String;

    @ApiProperty({ example: true })
    isActive: Boolean;

    @ApiProperty({ example: new Date().toISOString() })
    createAt?: Date;

    @ApiProperty({ example: new Date().toISOString() })
    updateAt?: Date;
}