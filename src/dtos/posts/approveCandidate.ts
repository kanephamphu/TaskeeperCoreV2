import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ApproveCandidateDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    postId: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    candidateId: string;
}
