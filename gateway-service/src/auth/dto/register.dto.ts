import { ApiProperty } from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty({ example: "user" })
    username: string;

    @ApiProperty({ example: "user@example.com" })
    email: string;

    @ApiProperty({ example: "123" })
    password: string;
}