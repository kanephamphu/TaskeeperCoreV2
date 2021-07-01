import { UserSchema, User } from "schemas/user/user.schema";
// import { usersProviders } from "users/users.providers";
import { Module } from "@nestjs/common";
import { UsersService } from "users/users.service";
import { JwtAuthGuard } from "auth/guards/jwt-auth.guard";
import UserController from "users/users.controller";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UsersService, JwtAuthGuard],
})
export class UsersModule {}
