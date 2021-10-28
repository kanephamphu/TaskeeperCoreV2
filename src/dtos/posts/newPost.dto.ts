import { JobType } from "enums/post/post.enum";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class NewPostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    requirement: string;

    @IsString()
    @IsEnum(JobType)
    jobType: JobType;

    @IsArray()
    tags: string[];

    @IsArray()
    industries: string[];

    @IsArray()
    positions: string[];

    @IsArray()
    skills: string[];

    @IsDate()
    expiredDate: Date;
}
