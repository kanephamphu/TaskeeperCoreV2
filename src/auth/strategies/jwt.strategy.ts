import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "auth/auth.service";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtPayload } from "auth/interfaces/payload.interface";
import { UserDto } from "users/dto/user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "taiRandom12433$$$",
        });
    }

    async validate(payload: JwtPayload): Promise<UserDto> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}
