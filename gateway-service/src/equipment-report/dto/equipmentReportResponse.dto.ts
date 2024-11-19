import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export class EquipmentReportResponseDTO {
    @ApiProperty({ example: "673aa12e3c7b8fa1eb138f09" })
    _id: string;
    
    @ApiProperty({ example: "6739f055d58a34a294ba6840", description: "The equipment's id" })
    equipmentId: string;

    @ApiProperty({ example: "67355face20f610c21fb52f8", description: "The user's id" })
    userId: string;

    @ApiProperty({ example: "6736cb3bb9a808891d124fa0", description: "The department's id" })
    departmentId: string;

    @ApiProperty({ example: "The report's title", description: "The report's title" })
    title: string;

    @ApiProperty({ example: "The description report", description: "The report's description" })
    description: string;

    @ApiProperty({ enum: ["Pending", "In progress", "Resolved", "Rejected"], example: "Pending", description: "The report's status" })
    @IsEnum(["Pending", "In progress", "Resolved", "Rejected"])
    status: string;

    @ApiProperty({ example: true, description: "The report's status" })
    isActive: boolean;

    @ApiProperty({ example: new Date().toISOString() })
    createAt: Date;

    @ApiProperty({ example: new Date().toISOString() })
    updateAt: Date;
}