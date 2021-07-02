import { COMMON_MESSAGE } from "enums/message/message.enum";
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
} from "@nestjs/common";
@Controller("auth")
export default class AuthController {
    constructor(private authService: AuthService) {}

    @Get("confirm")
    async login(@Res() res, @Req() req) {
        try {
            const token = req.query?.token;
            const userId = req.query?.id;
            if (token && userId) {
                const verifyResult = await this.authService.verifyByToken(
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
}
