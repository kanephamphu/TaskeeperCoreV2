import { IsNotEmpty, IsString } from "class-validator";

export class ApplyJobDto {
    @IsString()
    @IsNotEmpty()
    postId: string;

    @IsString()
    summaryMessage: string;
}
