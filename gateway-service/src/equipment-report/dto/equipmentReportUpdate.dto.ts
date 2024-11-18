import { ApiProperty } from "@nestjs/swagger";

export class EquipmentReportUpdateDTO {
    @ApiProperty({ example: "", description: "The report's id" })
    id: string;

    @ApiProperty({ example: "6739f055d58a34a294ba6840", description: "The equipment's id", required: false })
    equipmentId: string;

    @ApiProperty({ example: "67355face20f610c21fb52f8", description: "The user's id", required: false })
    userId: string;

    @ApiProperty({ example: "6736cb3bb9a808891d124fa0", description: "The department's id", required: false })
    departmentId: string;

    @ApiProperty({ example: "The report's title", description: "The report's title", required: false })
    title: string;

    @ApiProperty({ example: "The description report", description: "The report's description", required: false })
    description: string;

    @ApiProperty({ enum: ["Pending", "In progress", "Resolved", "Rejected"], example: "Pending", description: "The report's status", required: false })
    status: string;

    @ApiProperty({ example: true, description: "The report's status" })
    isActive: boolean;
}