import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ApplyJobDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    postId: string;

    @IsString()
    @ApiProperty()
    summaryMessage: string;
}
