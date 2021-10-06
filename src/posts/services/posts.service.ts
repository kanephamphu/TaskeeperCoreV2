import { ERROR_MESSAGE } from "./../../enums/message/message.enum";
import { EditPostDto } from "dtos/posts/post.dto";
import { NewPostDto } from "dtos/posts/newPost.dto";
import { Post } from "schemas/post/post.schema";
import { InjectQueryService, QueryService } from "@nestjs-query/core";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { COMMON_MESSAGE } from "enums/message/message.enum";
import { checkEditAuthorizationQueryBuilder } from "shared/querybuilder/postQuery.builder";
import { PermissionsService } from "permissions/services/permissions.service";
import { Action, Subject } from "enums/auth/auth.enum";
import { AccountType } from "enums/user/user.enum";

@Injectable()
export class PostsService {
    constructor(
        @InjectQueryService(Post)
        private readonly postsQueryService: QueryService<Post>,
        private permissionsService: PermissionsService
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

    async editPost(
        editedPost: EditPostDto,
        userId: string
    ): Promise<Error | Post> {
        const updatePermissionChecked = this.permissionsService.checkPermission(
            userId,
            Subject.POST,
            Action.UPDATE,
            AccountType.NORMAL_USER,
            editedPost._id
        );
        const postAuthentication = this.checkUpdatingPermission(
            userId,
            editedPost._id
        );
        const checkedResults = await Promise.all([
            updatePermissionChecked,
            postAuthentication,
        ]);
        const isHasPermission = _.some(
            checkedResults,
            (checkedResult) => checkedResult
        );

        if (isHasPermission) {
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }

    async checkUpdatingPermission(
        userId: string,
        postId: string
    ): Promise<Error | Boolean> {
        const userPermissionUpdateQuery = checkEditAuthorizationQueryBuilder(
            userId,
            postId
        );
        const postPermissionChecked = await this.postsQueryService.query(
            userPermissionUpdateQuery
        );

        if (postPermissionChecked) {
            return true;
        }

        return false;
    }
}
