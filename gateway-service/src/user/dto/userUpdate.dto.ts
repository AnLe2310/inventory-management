import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UserUpdateDTO {
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

