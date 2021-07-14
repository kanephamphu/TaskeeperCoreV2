import { SortDirection } from "@nestjs-query/core";
import { Type } from "class-transformer";
import {
    IsDefined,
    IsEnum,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidateNested,
} from "class-validator";

class SearchPagingDto {
    @IsNumber()
    @Min(0)
    @Max(10)
    @IsNotEmpty()
    limit: number;

    @IsNumber()
    @Min(0)
    @Max(10)
    @IsNotEmpty()
    offset: number;
}

export class SearchCommonDto {
    @IsNotEmptyObject()
    @IsObject()
    @Type(() => SearchPagingDto)
    @ValidateNested()
    paging: SearchPagingDto;
}

export class SearchSortingDto {
    @IsEnum(SortDirection)
    direction: SortDirection;
}

export class SearchFilterDto {
    @MinLength(0)
    @MaxLength(100)
    is: any;

    @MinLength(0)
    @MaxLength(100)
    isNot: any;

    @MinLength(0)
    @MaxLength(100)
    gt: any;

    @MinLength(0)
    @MaxLength(100)
    gte: any;

    @MinLength(0)
    @MaxLength(100)
    le: any;

    @MinLength(0)
    @MaxLength(100)
    lte: any;

    @MinLength(0)
    @MaxLength(100)
    iLike: any;
}
