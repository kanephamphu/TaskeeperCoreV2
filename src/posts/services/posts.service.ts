import { ERROR_MESSAGE } from "enums/message/message.enum";
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

    async getPost(userId, postId) {
        const readPermissionChecked = await this.permissionsService.checkPermission(
            userId,
            Subject.POST,
            Action.READ
        );

        if (readPermissionChecked) {
            const postData = await this.postsQueryService.getById(postId);

            if (postData && !postData.disabled) {
                return postData;
            }

            throw new Error(ERROR_MESSAGE.NOT_FOUND);
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }

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
            AccountType.NORMAL_USER
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
            const updatedPost = await this.postsQueryService.updateOne(
                editedPost._id,
                editedPost
            );

            if (updatedPost) {
                return updatedPost;
            }

            throw new Error(COMMON_MESSAGE.BAD_REQUEST);
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }

    async deletePost(deletedPostId: string, userId: string) {
        const deletePostPermissionChecked = this.permissionsService.checkPermission(
            userId,
            Subject.POST,
            Action.UPDATE,
            AccountType.NORMAL_USER
        );

        const postAuthentication = this.checkUpdatingPermission(
            userId,
            deletedPostId
        );
        const checkedResults = await Promise.all([
            deletePostPermissionChecked,
            postAuthentication,
        ]);
        const isHasPermission = _.some(
            checkedResults,
            (checkedResult) => checkedResult
        );

        if (isHasPermission) {
            const deletedPost = await this.postsQueryService.updateOne(
                deletedPostId,
                {
                    disabled: true,
                }
            );

            if (deletedPost) {
                return deletedPost;
            }

            throw new Error(COMMON_MESSAGE.FAILED);
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
