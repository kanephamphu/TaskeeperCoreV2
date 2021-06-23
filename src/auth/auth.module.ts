import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "users/users.module";
import { AuthService } from "auth/auth.service";
import { jwtConstants } from "auth/constants";
import { JwtStrategy } from "auth/strategies/jwt.strategy";
import { LocalStrategy } from "auth/strategies/local.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "60s" },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
