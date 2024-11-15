import { ApiProperty } from "@nestjs/swagger";

export class DepartmentCreateDTO {
    @ApiProperty()
    name: String;

    @ApiProperty()
    description: String;

    @ApiProperty()
    isActive: Boolean;

    @ApiProperty()
    createAt?: Date;

    @ApiProperty()
    updateAt?: Date;
}