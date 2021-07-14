import { UsersModule } from "users/users.module";
import { AuthModule } from "auth/auth.module";
import { Module } from "@nestjs/common";
import { CaslModule } from "casl/casl.module";
import { MongooseModule } from "@nestjs/mongoose";
import { CodetableModule } from "codetable/codetable.module";
import { MailModule } from "mail/mail.module";
import { TagsModule } from './tags/tags.module';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forRoot(
            "mongodb+srv://taskeeper_admin:ranDomPassword1608@cluster0.bctkf.mongodb.net/TaskeeperDev?retryWrites=true&w=majority"
        ),
        CodetableModule,
        AuthModule,
        TagsModule,
    ],
})
export class AppModule {}
