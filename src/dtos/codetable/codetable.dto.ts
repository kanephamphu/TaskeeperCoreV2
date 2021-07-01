import { IsNotEmpty, IsString } from "class-validator";

export class CodeTableDto {
    @IsString()
    @IsNotEmpty()
    codeId: string;

    @IsString()
    @IsNotEmpty()
    codeValue: string;

    @IsString()
    codeDescription: string;
}
