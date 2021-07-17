import { UsersModule } from "users/users.module";
import { AuthModule } from "auth/auth.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CodetableModule } from "codetable/codetable.module";
import { TagsModule } from "./tags/tags.module";
import { PermissionsModule } from './permissions/permissions.module';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forRoot(
            "mongodb+srv://taskeeper_admin:ranDomPassword1608@cluster0.bctkf.mongodb.net/TaskeeperDev?retryWrites=true&w=majority"
        ),
        CodetableModule,
        AuthModule,
        TagsModule,
        PermissionsModule,
    ],
})
export class AppModule {}
