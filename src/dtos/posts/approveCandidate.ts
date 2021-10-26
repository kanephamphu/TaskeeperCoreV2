import { IsNotEmpty, IsString } from "class-validator";

export class ApproveCandidateDto {
    @IsString()
    @IsNotEmpty()
    postId: string;

    @IsString()
    @IsNotEmpty()
    candidateId: string;
}
