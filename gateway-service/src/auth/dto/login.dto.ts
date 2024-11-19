import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDTO {
    @ApiProperty({ example: 'Admin', description: "The user's name or email" })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: '123', description: "The user's password" })
    @IsNotEmpty()
    password: string;
}