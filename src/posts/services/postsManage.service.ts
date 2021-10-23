import { PostsService } from "posts/services/posts.service";
import { COMMON_MESSAGE, ERROR_MESSAGE } from "enums/message/message.enum";
import { Post } from "schemas/post/post.schema";
import { InjectQueryService, QueryService } from "@nestjs-query/core";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { PermissionsService } from "permissions/services/permissions.service";
import { Action, Subject } from "enums/auth/auth.enum";
import { AccountType } from "enums/user/user.enum";
import { AddNewOwnersDto } from "dtos/posts/addNewOwners.dto";
import { UsersService } from "users/services/users.service";

@Injectable()
export class PostsManageService {
    constructor(
        @InjectQueryService(Post)
        private readonly postsQueryService: QueryService<Post>,
        private readonly postService: PostsService,
        private permissionsService: PermissionsService,
        private usersService: UsersService
    ) {}

    async addPostOwners(
        addNewOwnersDto: AddNewOwnersDto,
        userId: string
    ): Promise<Error | Post> {
        const updatePermissionChecked = this.permissionsService.checkPermission(
            userId,
            Subject.POST,
            Action.UPDATE,
            AccountType.NORMAL_USER
        );
        const postAuthentication = this.postService.checkPostOwnerPermission(
            userId,
            addNewOwnersDto.postId
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
            const checkUserExisting =
                await this.usersService.checkUsersExisting(
                    addNewOwnersDto.ownerIds
                );

            if (checkUserExisting) {
                const post = await this.postsQueryService.getById(
                    addNewOwnersDto.postId
                );
                let postOwnerIds = post.owner;
                postOwnerIds = _.chain(postOwnerIds)
                    .concat(postOwnerIds)
                    .uniq()
                    .value();

                const updatedPost = await this.postsQueryService.updateOne(
                    addNewOwnersDto.postId,
                    {
                        owner: postOwnerIds,
                    }
                );

                if (updatedPost) {
                    return updatedPost;
                }
            }

            throw new Error(COMMON_MESSAGE.BAD_REQUEST);
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }
}
