import { IsNotEmpty, IsString } from "class-validator";

export class ClosePostDto {
    @IsString()
    @IsNotEmpty()
    postId: string;
}
