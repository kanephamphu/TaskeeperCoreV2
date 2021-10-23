import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class AddNewOwnersDto {
    @IsString()
    @IsNotEmpty()
    postId: string;

    @IsArray()
    @IsNotEmpty()
    ownerIds: string[];
}
