import { JobType } from "enums/post/post.enum";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NewPostDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @IsString()
    @ApiProperty()
    requirement: string;

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
    positions: string[];

    @IsArray()
    @ApiProperty()
    skills: string[];

    @IsDate()
    @ApiProperty()
    expiredDate: Date;
}
