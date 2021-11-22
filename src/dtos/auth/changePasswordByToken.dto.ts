import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ChangePasswordByTokenDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly userId: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly token: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MinLength(8)
    @MaxLength(24)
    password: string;
}
