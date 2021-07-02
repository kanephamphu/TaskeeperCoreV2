import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.JWT_KEY}`,
        });
    }

    // async validate(payload: JwtPayload): Promise<UserDto> {
    //     const user = await this.authService.validateUser(payload);
    //     if (!user) {
    //         throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    //     }

    //     return user;
    // }
}
