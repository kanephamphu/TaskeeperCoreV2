import { PermissionsModule } from "permissions/permissions.module";
import { PostSchema, Post } from "schemas/post/post.schema";
import { Module } from "@nestjs/common";
import { PostsService } from "posts/services/posts.service";
import { NestjsQueryMongooseModule } from "@nestjs-query/query-mongoose";
import { GCloudStorageModule } from "@aginix/nestjs-gcloud-storage";
import { PostsController } from "posts/controllers/posts.controller";
import { ServicesModule } from "services/services.module";

@Module({
    imports: [
        NestjsQueryMongooseModule.forFeature([
            { document: Post, name: Post.name, schema: PostSchema },
        ]),
        GCloudStorageModule.withConfig({
            defaultBucketname: "taskeeperstorage",
            storageBaseUri: "taskeeperstorage",
        }),
        ServicesModule,
        PermissionsModule,
    ],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}
