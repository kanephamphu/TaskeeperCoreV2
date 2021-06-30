import { Module } from "@nestjs/common";
import { databaseProviders } from "database/database.providers";
import { User, UserSchema } from "schemas/user/user.schema";

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
