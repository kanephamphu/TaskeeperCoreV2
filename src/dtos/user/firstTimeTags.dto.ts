import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export default class FirstTimeTagsDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    accessToken: string;

    @IsArray()
    @ApiProperty()
    @IsNotEmpty()
    tagIds: string[];
}
