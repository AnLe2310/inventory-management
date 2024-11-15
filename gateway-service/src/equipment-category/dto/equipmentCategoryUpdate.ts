import { ApiProperty } from "@nestjs/swagger";

export class EquipmentCategoryUpdateDTO {
    @ApiProperty({ example: "67355face20f610c21fb52f8" })
    id: string;

    @ApiProperty({ example: "Laptop", required: false })
    name: String;

    @ApiProperty({ example: "The description category", required: false })
    description: String;

    @ApiProperty({ example: true, required: false })
    isActive: Boolean;
}