import { LoginDto } from "./../../dto/auth/login.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(loginData: LoginDto): Promise<any> {
        const user = await this.authService.validateUser(loginData);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
