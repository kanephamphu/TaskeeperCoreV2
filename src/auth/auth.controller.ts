import { LoginUserDto } from "users/dto/user-login.dto";
import { AuthService } from "auth/auth.service";
import { Controller, Post, Body, UseGuards } from "@nestjs/common";
@Controller("auth")
export default class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
}
