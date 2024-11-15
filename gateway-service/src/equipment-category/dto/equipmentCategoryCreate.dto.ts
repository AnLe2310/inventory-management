import { ApiProperty } from "@nestjs/swagger";

export class EquipmentCategoryCreateDTO {
    @ApiProperty({ example: "Laptop" })
    name: String;

    @ApiProperty({ example: "The description category" })
    description: String;

    @ApiProperty({ example: true })
    isActive: Boolean;

    @ApiProperty({ required: false })
    createAt?: Date;

    @ApiProperty({ required: false })
    updateAt?: Date;
}