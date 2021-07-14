import { LanguageCode } from "enums/codetable/language.enum";
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
} from "class-validator";

export class SearchTagsDto {
    @IsString()
    readonly searchString: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly searchPopular: boolean;

    @IsNumber()
    @Min(0)
    @Max(100)
    @IsNotEmpty()
    readonly amount: number;

    @IsNotEmpty()
    @IsEnum(LanguageCode)
    readonly languageCode: LanguageCode;
}
