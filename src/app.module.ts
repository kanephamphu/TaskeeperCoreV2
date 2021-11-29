import { UsersModule } from "users/users.module";
import { AuthModule } from "auth/auth.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CodetableModule } from "codetable/codetable.module";
import { TagsModule } from "tags/tags.module";
import { PermissionsModule } from "permissions/permissions.module";
import { GatewayModule } from "gateway/gateway.module";
import { PostsModule } from "posts/posts.module";
import { GCloudStorageModule } from "@aginix/nestjs-gcloud-storage";
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
        GatewayModule,
        PostsModule,
        GCloudStorageModule.withConfig({
            defaultBucketname: "bucket.aginix.tech",
            storageBaseUri: "bucket.aginix.tech",
            predefinedAcl: "private", // Default is publicRead
        }),
    ],
})
export class AppModule {}
