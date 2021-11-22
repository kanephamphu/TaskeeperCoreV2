import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class AddNewOwnersDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    postId: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    ownerIds: string[];
}
