import { ApiProperty } from "@nestjs/swagger";

export class DepartmentCreateDTO {
    @ApiProperty({ example: "Phòng Họp" })
    name: String;

    @ApiProperty({ example: "The description department" })
    description: String;

    @ApiProperty({ example: true })
    isActive: Boolean;

    @ApiProperty({ required: false })
    createAt?: Date;

    @ApiProperty({ required: false })
    updateAt?: Date;
}