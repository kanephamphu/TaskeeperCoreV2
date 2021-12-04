import { JobType, SalaryType } from "enums/post/post.enum";
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsNumber,
    Min,
    IsDate,
    IsOptional,
} from "class-validator";
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

    @IsString()
    @IsArray()
    @ApiProperty()
    positions: string[];
}
