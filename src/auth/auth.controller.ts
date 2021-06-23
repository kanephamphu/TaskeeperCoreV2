import { LoginDto } from "dto/auth/login.dto";
import { AuthService } from "auth/auth.service";
import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "auth/guards/local-auth.guard";
@Controller("auth")
export default class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login({
            userId: 1,
            username: "john",
            password: "changeme",
        });
    }
}
