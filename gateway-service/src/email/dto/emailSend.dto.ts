import { ApiProperty } from "@nestjs/swagger";

export class EmailSendDTO {
    @ApiProperty({ example: "example@gmail.com", description: "The recipient's email" })
    to: string;

    @ApiProperty({ example: "example1@gmail.com", required: false, description: "The recipient's email that will receive a copy of the email" })
    cc?: string | string[];

    @ApiProperty({ example: "example2@gmail.com", required: false, description: "The recipient's email that will receive a blind carbon copy of the email" })
    bcc?: string | string[];

    @ApiProperty({ example: "Email subject", description: "The email's subject" })
    subject: string;

    @ApiProperty({ required: false, description: "The email's text" })
    text?: string;

    @ApiProperty({ required: false, description: "The email's html" })
    html?: string;
}