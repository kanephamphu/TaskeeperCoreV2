import { LoginDto } from "dto/auth/login.dto";
import { AuthService } from "auth/auth.service";
import { Controller, Post, Body, UseGuards } from "@nestjs/common";
@Controller("auth")
export default class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
