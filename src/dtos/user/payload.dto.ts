import { AccountType, AccountStatus } from "enums/user/user.enum";
import { IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class PayLoad {
    @IsString()
    @ApiProperty()
    _id: string;

    @IsString()
    @ApiProperty()
    @IsEnum(AccountType)
    accountType: string;

    @IsString()
    @ApiProperty()
    @IsEnum(AccountStatus)
    accountStatus: string;
}
