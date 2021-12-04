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

class SearchUserFieldsDto {
    @IsObject()
    @ApiProperty()
    @IsOptional()
    lastName: SearchFilterDto;

    @IsObject()
    @ApiProperty()
    @IsOptional()
    firstName: SearchFilterDto;

    @IsObject()
    @ApiProperty()
    @IsOptional()
    _id: SearchFilterDto;
}

class SearchUsersSortingDto extends SearchSortingDto {
    @IsEnum(SearchUsers)
    @ApiProperty()
    field: SearchUsers;
}

class SearchUsersFilter extends SearchUserFieldsDto {
    @IsArray()
    @IsOptional()
    @ApiProperty()
    @Type(() => SearchUserFieldsDto)
    and: SearchUserFieldsDto[];

    @IsArray()
    @ApiProperty()
    @IsOptional()
    @Type(() => SearchUserFieldsDto)
    or: SearchUserFieldsDto[];
}

export class SearchUsersDto extends SearchCommonDto {
    @IsObject()
    @ApiProperty()
    @IsOptional()
    @Type(() => SearchUsersFilter)
    @ValidateNested()
    filter: SearchUsersFilter;

    @IsOptional()
    @IsArray()
    @ApiProperty()
    @Type(() => SearchUsersSortingDto)
    @ValidateNested()
    sorting: SearchUsersSortingDto[];
}
