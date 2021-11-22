import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ClosePostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    postId: string;
}
