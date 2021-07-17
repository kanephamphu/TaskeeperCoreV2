import { ChangePasswordByTokenDto } from "dtos/auth/changePasswordByToken.dto";
import { ForgotPasswordDto } from "dtos/auth/forgotPassword.dto";
import { NumberVerifyDto } from "dtos/auth/numberVerify.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "users/services/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginStatus } from "auth/interfaces/login-status.interface";
import PayLoad from "dtos/user/payload.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    verifyAccountByToken(
        token: string,
        userId: string
    ): Promise<boolean | Error> {
        return this.usersService.verifyAccountByToken(token, userId);
    }

    verifyAccountByNumber(
        numberVerifyDto: NumberVerifyDto
    ): Promise<boolean | Error> {
        return this.usersService.verifyAccountByNumber(
            numberVerifyDto.number,
            numberVerifyDto.userId
        );
    }

    handleForgotPassword(
        forgotPasswordDto: ForgotPasswordDto
    ): Promise<string | Error> {
        return this.usersService.handleForgotPassword(forgotPasswordDto);
    }

    checkVerifyNumber(
        numberVerifyDto: NumberVerifyDto
    ): Promise<string | Error> {
        return this.usersService.checkVerifyNumber(numberVerifyDto);
    }

    changePasswordByToken(
        changePasswordByTokenDto: ChangePasswordByTokenDto
    ): Promise<string | Error> {
        return this.usersService.changePasswordByToken(
            changePasswordByTokenDto
        );
    }

    validateUser(payload: PayLoad): boolean {
        debugger;
        return true;
    }
}
