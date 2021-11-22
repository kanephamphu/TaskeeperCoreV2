import { SearchTags } from "enums/search/searchFields.enum";
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

class SearchTagsFieldsDto {
    @IsObject()
    @ApiProperty()
    @IsOptional()
    "value.vi_VI": SearchFilterDto;

    @IsObject()
    @ApiProperty()
    @IsOptional()
    "value.en_US": SearchFilterDto;

    @IsObject()
    @ApiProperty()
    @IsOptional()
    usingTimes: SearchFilterDto;
}
class SearchTagsSortingDto extends SearchSortingDto {
    @IsEnum(SearchTags)
    @ApiProperty()
    field: SearchTags;
}

class SearchTagsFilter extends SearchTagsFieldsDto {
    @IsArray()
    @IsOptional()
    @ApiProperty()
    @Type(() => SearchTagsFieldsDto)
    and: SearchTagsFieldsDto[];

    @IsArray()
    @ApiProperty()
    @IsOptional()
    @Type(() => SearchTagsFieldsDto)
    or: SearchTagsFieldsDto[];
}

export class SearchTagsDto extends SearchCommonDto {
    @IsObject()
    @ApiProperty()
    @IsOptional()
    @Type(() => SearchTagsFilter)
    @ValidateNested()
    filter: SearchTagsFilter;

    @IsOptional()
    @IsArray()
    @ApiProperty()
    @Type(() => SearchTagsSortingDto)
    @ValidateNested()
    sorting: SearchTagsSortingDto[];
}
