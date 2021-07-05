import { ChangePasswordByTokenDto } from "dtos/auth/changePasswordByToken.dto";
import { ForgotPasswordDto } from "dtos/auth/forgotPassword.dto";
import { NumberVerifyDto } from "dtos/auth/numberVerify.dto";
import { UsersService } from "users/users.service";
import { COMMON_MESSAGE, USER_LOGIN_MESSAGE } from "enums/message/message.enum";
import { AuthService } from "auth/auth.service";
import {
    Controller,
    Post,
    Body,
    UseGuards,
    Res,
    Req,
    Get,
    HttpStatus,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import UserLoginDto from "dtos/user/login.dto";
@Controller("auth")
export default class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @Get("confirm")
    async confirm(@Res() res, @Req() req) {
        try {
            const token = req.query?.token;
            const userId = req.query?.id;
            if (token && userId) {
                const verifyResult = await this.authService.verifyAccountByToken(
                    token,
                    userId
                );
                if (verifyResult) {
                    return res.status(HttpStatus.OK).json({
                        message: COMMON_MESSAGE.SUCCESS,
                    });
                }
            }
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.BAD_REQUEST,
                error: error.message,
            });
        }
    }

    @Post("confirm")
    @UsePipes(new ValidationPipe({ transform: true }))
    async confirmNumber(@Res() res, @Body() numberVerifyDto: NumberVerifyDto) {
        try {
            const verifyResult = await this.authService.verifyAccountByNumber(
                numberVerifyDto
            );
            if (verifyResult) {
                return res.status(HttpStatus.OK).json({
                    message: COMMON_MESSAGE.SUCCESS,
                });
            }
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.BAD_REQUEST,
                error: error.message,
            });
        }
    }

    @Post("login")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async login(@Res() res, @Body() userLoginDto: UserLoginDto) {
        try {
            const user = await this.usersService.login(userLoginDto);

            if (user) {
                return res
                    .status(HttpStatus.ACCEPTED)
                    .json({ message: USER_LOGIN_MESSAGE.SUCCESS, user });
            } else {
                return res
                    .status(HttpStatus.NOT_FOUND)
                    .json({ message: USER_LOGIN_MESSAGE.FAILED });
            }
        } catch (error) {
            //Todo: Error Handler
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: USER_LOGIN_MESSAGE.FAILED,
                error,
            });
        }
    }

    @Post("forgotpassword")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async forgotPassword(
        @Res() res,
        @Body() forgotPasswordDto: ForgotPasswordDto
    ) {
        try {
            const userId = await this.authService.handleForgotPassword(
                forgotPasswordDto
            );

            res.status(HttpStatus.OK).json({
                message: COMMON_MESSAGE.SUCCESS,
                data: { userId },
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.BAD_REQUEST,
                error: error.message,
            });
        }
    }

    @Post("checkverifynumber")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async checkVerifyNumber(
        @Res() res,
        @Body() numberVerifyDto: NumberVerifyDto
    ) {
        try {
            const token = await this.authService.checkVerifyNumber(
                numberVerifyDto
            );

            res.status(HttpStatus.OK).json({
                message: COMMON_MESSAGE.SUCCESS,
                data: { token },
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.BAD_REQUEST,
                error: error.message,
            });
        }
    }

    @Post("changepasswordbytoken")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async changePasswordByToken(
        @Res() res,
        @Body() changePasswordByTokenDto: ChangePasswordByTokenDto
    ) {
        try {
            const userId = await this.authService.changePasswordByToken(
                changePasswordByTokenDto
            );

            res.status(HttpStatus.OK).json({
                message: COMMON_MESSAGE.SUCCESS,
                data: { userId },
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.BAD_REQUEST,
                error: error.message,
            });
        }
    }
}
