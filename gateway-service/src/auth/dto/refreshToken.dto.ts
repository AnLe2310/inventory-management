import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDTO {
    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzU1ZmFjZTIwZjYxMGMyMWZiNTJmOCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxOTIxMzg5LCJleHAiOjE3MzE5MjQ5ODl9.Nwh8iby6c-PCnYNYAyyysJnVdz3jp9vbQf9rIAlaTh0" })
    access_token: string;
}