import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserCreateDTO {
    @ApiProperty({ example: 'admin', description: "The user's name" })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'admin@example.com', description: "The user's email" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456', description: "The user's password" })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: '6739c18f9bb9791f51bd31f6', description: "The user's role" })
    @IsNotEmpty()
    roleId: string;

    @ApiProperty({ example: true, description: "The user's status" })
    @IsNotEmpty()
    isActive: boolean;

    @ApiProperty({ required: false })
    createAt?: Date;

    @ApiProperty({ required: false })
    updateAt?: Date;
}

