import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserUpdateDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    isActive: boolean;
}
