import { SearchJobs } from "../../enums/search/searchFields.enum";
import { JobType } from "enums/post/post.enum";
import { SearchUsers } from "enums/search/searchFields.enum";
import {
    SearchCommonDto,
    SearchFilterDto,
    SearchSortingDto,
} from "dtos/common/searchCommon.dto";
import {
    IsArray,
    IsEnum,
    IsObject,
    IsOptional,
    ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

class SearchJobFieldsDto {
    @IsObject()
    @ApiProperty()
    @IsOptional()
    title: SearchFilterDto;

    @IsObject()
    @ApiProperty()
    @IsOptional()
    description: SearchFilterDto;

    @IsObject()
    @ApiProperty()
    @IsOptional()
    jobType: SearchFilterDto;

    @IsObject()
    @ApiProperty()
    @IsOptional()
    location: SearchFilterDto;

    @IsObject()
    @ApiProperty()
    @IsOptional()
    _id: SearchFilterDto;
}

class SearchJobsSortingDto extends SearchSortingDto {
    @IsEnum(SearchJobs)
    @ApiProperty()
    field: SearchJobs;
}

class SearchJobsFilter extends SearchJobFieldsDto {
    @IsArray()
    @IsOptional()
    @ApiProperty()
    @Type(() => SearchJobFieldsDto)
    and: SearchJobFieldsDto[];

    @IsArray()
    @ApiProperty()
    @IsOptional()
    @Type(() => SearchJobFieldsDto)
    or: SearchJobFieldsDto[];
}

export class SearchJobsDto extends SearchCommonDto {
    @IsObject()
    @ApiProperty()
    @IsOptional()
    @Type(() => SearchJobsFilter)
    @ValidateNested()
    filter: SearchJobsFilter;

    @IsOptional()
    @IsArray()
    @ApiProperty()
    @Type(() => SearchJobsSortingDto)
    @ValidateNested()
    sorting: SearchJobsSortingDto[];
}
