import { JobType } from "enums/post/post.enum";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EditPostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    _id: string;

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    @IsEnum(JobType)
    jobType: JobType;

    @IsArray()
    @ApiProperty()
    tags: string[];

    @IsArray()
    @ApiProperty()
    industries: string[];

    @IsArray()
    @ApiProperty()
    skills: string[];
}
