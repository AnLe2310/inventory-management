import { ApiProperty } from "@nestjs/swagger";

export class RoleCreateDTO {
    @ApiProperty({ example: "admin" })
    name: string;

    @ApiProperty({ example: "The description role" })
    description: string;

    @ApiProperty({ required: false })
    createAt?: Date;
    
    @ApiProperty({ required: false })
    updateAt?: Date;
}