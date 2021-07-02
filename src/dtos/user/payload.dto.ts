import { AccountType, AccountStatus } from "enums/user/user.enum";
import { IsEnum, IsString } from "class-validator";

export default class PayLoad {
    @IsString()
    _id: string;

    @IsString()
    @IsEnum(AccountType)
    accountType: string;

    @IsString()
    @IsEnum(AccountStatus)
    accountStatus: string;
}
