import { SortDirection } from "@nestjs-query/core";
import { ApiProperty } from "@nestjs/swagger";
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
    @Max(1000)
    @ApiProperty()
    @IsNotEmpty()
    limit: number;

    @IsNumber()
    @Min(0)
    @Max(1000)
    @ApiProperty()
    @IsNotEmpty()
    offset: number;
}

export class SearchCommonDto {
    @IsNotEmptyObject()
    @IsObject()
    @ApiProperty()
    @Type(() => SearchPagingDto)
    @ValidateNested()
    paging: SearchPagingDto;
}

export class SearchSortingDto {
    @IsEnum(SortDirection)
    @ApiProperty()
    direction: SortDirection;
}

export class SearchFilterDto {
    @MinLength(0)
    @ApiProperty()
    @MaxLength(100)
    is: any;

    @MinLength(0)
    @ApiProperty()
    @MaxLength(100)
    isNot: any;

    @MinLength(0)
    @ApiProperty()
    @MaxLength(100)
    gt: any;

    @MinLength(0)
    @ApiProperty()
    @MaxLength(100)
    gte: any;

    @MinLength(0)
    @ApiProperty()
    @MaxLength(100)
    le: any;

    @MinLength(0)
    @ApiProperty()
    @MaxLength(100)
    lte: any;

    @MinLength(0)
    @ApiProperty()
    @MaxLength(100)
    iLike: any;

    @MinLength(0)
    @ApiProperty()
    @MaxLength(100)
    like: any;

    @MinLength(0)
    @ApiProperty()
    @MaxLength(100)
    in: any;
}
