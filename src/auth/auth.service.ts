import { ForgotPasswordDto } from "dtos/auth/forgotPassword.dto";
import { NumberVerifyDto } from "dtos/auth/numberVerify.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginStatus } from "auth/interfaces/login-status.interface";

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

    // async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    //     // find user in db
    //     const user = await this.usersService.findByLogin(loginUserDto);

    //     // generate and sign token
    //     const token = this._createToken(user);

    //     return {
    //         loginString: user.loginString,
    //         ...token,
    //     };
    // }

    // async validateUser(payload: JwtPayload): Promise<UserDto> {
    //     const user = await this.usersService.findByPayload(payload);
    //     if (!user) {
    //         throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    //     }

    //     return user;
    // }

    // private _createToken({ loginString }: UserDto): any {
    //     const expiresIn = process.env.EXPIRESIN;

    //     const user: JwtPayload = { loginString };
    //     const accessToken = this.jwtService.sign(user);

    //     return {
    //         expiresIn,
    //         accessToken,
    //     };
    // }
}
