import { ApiProperty } from "@nestjs/swagger";

export class CategoryUpdateDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: String;

    @ApiProperty()
    description: String;

    @ApiProperty()
    isActive: Boolean;
}