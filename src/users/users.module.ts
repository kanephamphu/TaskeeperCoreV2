import { UserSchema, User } from "schemas/user/user.schema";
// import { usersProviders } from "users/users.providers";
import { Module } from "@nestjs/common";
import { UsersService } from "users/users.service";
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard";
import UserController from "users/users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "auth/auth.constants";
import { MailModule } from "mail/mail.module";
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: jwtConstants.access_token,
            signOptions: { expiresIn: "60s" },
        }),
        MailModule,
    ],
    controllers: [UserController],
    providers: [UsersService, JwtAuthGuard],
    exports: [UsersService],
})
export class UsersModule {}
