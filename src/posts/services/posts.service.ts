import { ERROR_MESSAGE } from "enums/message/message.enum";
import { EditPostDto } from "dtos/posts/post.dto";
import { NewPostDto } from "dtos/posts/newPost.dto";
import { Post } from "schemas/post/post.schema";
import { InjectQueryService, QueryService } from "@nestjs-query/core";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { checkPostOwnerQueryBuilder } from "shared/querybuilder/postQuery.builder";
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
        const postAuthentication = this.checkPostOwnerPermission(
            userId,
            editedPost._id
        );
        const checkedResults = await Promise.all([
            updatePermissionChecked,
            postAuthentication,
        ]);
        const isHasPermission = _.every(
            checkedResults,
            (checkedResult) => checkedResult
        );

        if (isHasPermission) {
<<<<<<< HEAD
            const postUpdated = await this.postsQueryService.updateOne(
=======
            const updatedPost = await this.postsQueryService.updateOne(
>>>>>>> 270628d20ddaba0379c1d1bd4d0cb2c32d35d48d
                editedPost._id,
                editedPost
            );

<<<<<<< HEAD
            if (postUpdated) {
                return postUpdated;
            }

            throw new Error(ERROR_MESSAGE.NOT_FOUND);
=======
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
>>>>>>> 270628d20ddaba0379c1d1bd4d0cb2c32d35d48d
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }

    async deletePost(userId: string, postId: string): Promise<Error | Post> {
        const postOwnerChecked = this.checkPostOwnerPermission(userId, postId);
        const postDeletingPermissionChecked =
            this.permissionsService.checkPermission(
                userId,
                Subject.POST,
                Action.DELETE,
                AccountType.NORMAL_USER
            );
        const permissionCheckedResults = Promise.all([
            postOwnerChecked,
            postDeletingPermissionChecked,
        ]);
        const isHasPermission = _.every(
            permissionCheckedResults,
            (permissionCheckedResult) => permissionCheckedResult
        );

        if (isHasPermission) {
            const deletedPost = await this.postsQueryService.updateOne(postId, {
                disabled: true,
            });

            if (deletedPost) {
                return deletedPost;
            }

            throw new Error(ERROR_MESSAGE.NOT_FOUND);
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }

    async getPost(userId: string, postId: string): Promise<Error | Post> {
        const postReadingPermissionChecked =
            await this.permissionsService.checkPermission(
                userId,
                Subject.POST,
                Action.DELETE,
                AccountType.NORMAL_USER
            );

        if (postReadingPermissionChecked) {
            const post = await this.postsQueryService.getById(postId);

            if (post) {
                return post;
            }

            throw new Error(ERROR_MESSAGE.NOT_FOUND);
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }

    async checkPostOwnerPermission(
        userId: string,
        postId: string
    ): Promise<Error | boolean> {
        const postOwnerQuery = checkPostOwnerQueryBuilder(userId, postId);
        const postPermissionChecked = await this.postsQueryService.query(
            postOwnerQuery
        );

        if (postPermissionChecked) {
            return true;
        }

        return false;
    }
}
