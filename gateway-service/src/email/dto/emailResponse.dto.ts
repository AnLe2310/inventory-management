import { ApiProperty } from "@nestjs/swagger";

export class EmailResponseDTO {
    @ApiProperty({ example: { from: "example1@gmail", to: ["example2@gmail", "example3@gmail"] } })
    envelope: any;

    @ApiProperty({ example: ['example1@gmail'] })
    accepted: any;

    @ApiProperty({ example: ['example4@gmail', 'example5@gmail'] })
    rejected: any;

    @ApiProperty({ example: "<8bea0d30-95e2-520e-2830-c977065041af@gmail.com>" })
    messageId: string;
}