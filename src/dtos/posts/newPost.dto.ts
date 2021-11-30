import { JobType, SalaryType } from "enums/post/post.enum";
import {
    IsArray,
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from "class-validator";
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
    @IsOptional()
    expiredDate: Date;

    @IsEnum(SalaryType)
    @ApiProperty()
    salaryType: SalaryType;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    minSalary: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    maxSalary: number;

    @IsString()
    @ApiProperty()
    location: string;

    @IsString()
    @ApiProperty()
    responsibilities: string;

    @IsString()
    @ApiProperty()
    experience: string;

    @IsString()
    @ApiProperty()
    benefits: string;
}
