import { CodeTablesModule } from "codetables/codetables.module";
import { UsersModule } from "users/users.module";
import { AuthModule } from "auth/auth.module";
import { Module } from "@nestjs/common";
import { CaslModule } from "./casl/casl.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        UsersModule,
        CodeTablesModule,
        MongooseModule.forRoot(
            "mongodb+srv://taskeeper_admin:ranDomPassword1608@cluster0.bctkf.mongodb.net/TaskeeperDev?retryWrites=true&w=majority"
        ),
    ],
})
export class AppModule {}
