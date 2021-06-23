import { Injectable } from "@nestjs/common";
import { UsersService } from "users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "dto/auth/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(loginString, password): Promise<any> {
        debugger;
        const user = await this.usersService.findOne(loginString);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
