import { DatabaseModule } from "database/database.module";
import { usersProviders } from "users/users.providers";
import { Module } from "@nestjs/common";
import { UsersService } from "users/users.service";
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard";
import UserController from "users/users.controller";
@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UsersService, JwtAuthGuard, ...usersProviders],
})
export class UsersModule {}
