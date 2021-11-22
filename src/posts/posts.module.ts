import { UsersModule } from "users/users.module";
import { PermissionsModule } from "permissions/permissions.module";
import { PostSchema, Post } from "schemas/post/post.schema";
import { Module } from "@nestjs/common";
import { PostsService } from "posts/services/posts.service";
import { NestjsQueryMongooseModule } from "@nestjs-query/query-mongoose";
import { GCloudStorageModule } from "@aginix/nestjs-gcloud-storage";
import { PostsController } from "posts/controllers/posts.controller";
import { ServicesModule } from "services/services.module";
import { PostsManageController } from "posts/controllers/postsManage.controller";
import { PostsManageService } from "./services/postsManage.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        NestjsQueryMongooseModule.forFeature([
            { document: Post, name: Post.name, schema: PostSchema },
        ]),
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        GCloudStorageModule.withConfig({
            defaultBucketname: "taskeeperstorage",
            storageBaseUri: "taskeeperstorage",
        }),
        ServicesModule,
        UsersModule,
        PermissionsModule,
    ],
    providers: [PostsService, PostsManageService],
    controllers: [PostsController, PostsManageController],
})
export class PostsModule {}
