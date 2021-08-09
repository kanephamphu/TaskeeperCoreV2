import { LanguageCode } from "enums/codetable/language.enum";
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
} from "class-validator";

export default class SearchTagByStringDto {
    @IsString()
    @IsNotEmpty()
    searchString: string;

    @IsEnum(LanguageCode)
    @IsNotEmpty()
    languageCode: LanguageCode;

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
