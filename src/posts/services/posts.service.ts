import { NewPostDto } from "dtos/posts/newPost.dto";
import { Post } from "schemas/post/post.schema";
import { InjectQueryService, QueryService } from "@nestjs-query/core";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { COMMON_MESSAGE } from "enums/message/message.enum";

@Injectable()
export class PostsService {
    constructor(
        @InjectQueryService(Post)
        private readonly postsQueryService: QueryService<Post>
    ) {}

    async addPost(
        newPostDto: NewPostDto,
        userId: string
    ): Promise<Error | Post> {
        const newPost = _.assign(newPostDto, { userId });
        const createdPost = await this.postsQueryService.createOne(newPost);

        if (createdPost) {
            return createdPost;
        }

        throw new Error(COMMON_MESSAGE.BAD_REQUEST);
    }
}
