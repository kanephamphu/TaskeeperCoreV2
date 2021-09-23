import { PostSchema, Post } from "schemas/post/post.schema";
import { Module } from "@nestjs/common";
import { PostsService } from "posts/services/posts.service";
import { NestjsQueryMongooseModule } from "@nestjs-query/query-mongoose";
import { GCloudStorageModule } from "@aginix/nestjs-gcloud-storage";
import { PostsController } from "posts/controllers/posts.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        NestjsQueryMongooseModule.forFeature([
            { document: Post, name: Post.name, schema: PostSchema },
        ]),
        GCloudStorageModule.withConfig({
            defaultBucketname: "taskeeperstorage",
            storageBaseUri: "taskeeperstorage",
        }),
        JwtModule.register({
            secret: `${process.env.JWT_KEY}`,
        }),
    ],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}
