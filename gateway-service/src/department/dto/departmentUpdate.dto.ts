import { ApiProperty } from "@nestjs/swagger";

export class DepartmentUpdateDTO {
    @ApiProperty({ example: "67355face20f610c21fb52f8" })
    id: string;

    @ApiProperty({ example: "Phòng Họp", required: false })
    name: String;

    @ApiProperty({ example: "The description department", required: false })
    description: String;

    @ApiProperty({example: true, required: false})
    isActive: Boolean;
}