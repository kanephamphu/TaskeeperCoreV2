import { LanguageCode } from "enums/codetable/language.enum";
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class SearchTagByStringDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    searchString: string;

    @IsEnum(LanguageCode)
    @IsNotEmpty()
    @ApiProperty()
    languageCode: LanguageCode;

    @IsNumber()
    @Min(0)
    @Max(10)
    @ApiProperty()
    @IsNotEmpty()
    limit: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    @Max(10)
    @IsNotEmpty()
    offset: number;
}
