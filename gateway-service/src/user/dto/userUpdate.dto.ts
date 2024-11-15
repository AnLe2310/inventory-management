import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UserUpdateDTO {
    @ApiProperty({ example: "67355face20f610c21fb52f8", description: "The user's id" })
    id: string;

    @ApiProperty({ example: "admin", description: "The user's name", required: false })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "123456", description: "The user's password", required: false })
    password: string;

    @ApiProperty({ example: "admin", description: "The user's role", required: false })
    role: string;

    @ApiProperty({ example: true, description: "The user's status", required: false })
    isActive: boolean;
}

