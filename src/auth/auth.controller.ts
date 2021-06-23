import { AuthService } from "auth/auth.service";
import { Controller, Post, Body } from "@nestjs/common";

@Controller("auth")
export default class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() req) {
        return this.authService.login(req.body?.user);
    }
}
