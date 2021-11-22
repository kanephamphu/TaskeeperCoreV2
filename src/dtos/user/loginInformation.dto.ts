import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginInformation {
    @IsString()
    @ApiProperty()
    @MinLength(8)
    @MaxLength(24)
    @IsNotEmpty()
    password: string;

    @IsString()
    @ApiProperty()
    readonly facebookToken: string;

    @IsString()
    @ApiProperty()
    readonly googleToken: string;
}
