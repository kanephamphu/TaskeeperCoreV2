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

class SearchTagsFieldsDto {
    @IsObject()
    @IsOptional()
    "value.vi_VI": SearchFilterDto;

    @IsObject()
    @IsOptional()
    "value.en_US": SearchFilterDto;

    @IsObject()
    @IsOptional()
    usingTimes: SearchFilterDto;
}
class SearchTagsSortingDto extends SearchSortingDto {
    @IsEnum(SearchTags)
    field: SearchTags;
}

class SearchTagsFilter extends SearchTagsFieldsDto {
    @IsArray()
    @IsOptional()
    @Type(() => SearchTagsFieldsDto)
    and: SearchTagsFieldsDto[];

    @IsArray()
    @IsOptional()
    @Type(() => SearchTagsFieldsDto)
    or: SearchTagsFieldsDto[];
}

export class SearchTagsDto extends SearchCommonDto {
    @IsObject()
    @IsOptional()
    @Type(() => SearchTagsFilter)
    @ValidateNested()
    filter: SearchTagsFilter;

    @IsOptional()
    @IsArray()
    @Type(() => SearchTagsSortingDto)
    @ValidateNested()
    sorting: SearchTagsSortingDto[];
}
