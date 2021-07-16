import { IsArray, IsNotEmpty, IsString } from "class-validator";

export default class FirstTimeTagsDto {
    @IsString()
    @IsNotEmpty()
    accessToken: string;

    @IsArray()
    @IsNotEmpty()
    tagIds: string[];
}
