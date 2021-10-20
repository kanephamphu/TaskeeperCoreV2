import { IsNotEmpty, IsString } from "class-validator";

export class DeletePostDto {
    @IsString()
    @IsNotEmpty()
    postId: string;
}
