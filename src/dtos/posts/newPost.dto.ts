import { JobType } from "enums/post/post.enum";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class NewPostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
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
