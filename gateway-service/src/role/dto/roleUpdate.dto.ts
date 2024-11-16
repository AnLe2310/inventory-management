import { ApiProperty } from "@nestjs/swagger";

export class RoleUpdateDTO {
    @ApiProperty({ example: "67355face20f610c21fb52f8" })
    id: string;

    @ApiProperty({ example: "admin", required: false })
    name: string;

    @ApiProperty({ example: "The description role", required: false })
    description: string;
}