import { JobType } from "enums/post/post.enum";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class EditPostDto {
    @IsString()
    @IsNotEmpty()
    _id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsEnum(JobType)
    jobType: JobType;

    @IsArray()
    tags: string[];

    @IsArray()
    industries: string[];

    @IsArray()
    skills: string[];
}
