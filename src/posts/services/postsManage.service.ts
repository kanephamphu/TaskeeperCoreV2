import {
    checkAlreadyApplyQueryBuilder,
    applyJobQueryBuilder,
} from "shared/querybuilder/postQuery.builder";
import { PostsService } from "posts/services/posts.service";
import {
    COMMON_MESSAGE,
    ERROR_MESSAGE,
    POST_ERROR_MESSAGE,
} from "enums/message/message.enum";
import { Post } from "schemas/post/post.schema";
import { InjectQueryService, QueryService } from "@nestjs-query/core";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { PermissionsService } from "permissions/services/permissions.service";
import { Action, Subject } from "enums/auth/auth.enum";
import { AccountType } from "enums/user/user.enum";
import { AddNewOwnersDto } from "dtos/posts/addNewOwners.dto";
import { UsersService } from "users/services/users.service";
import { ApplyJobDto } from "dtos/posts/applyJob.dto";
import { ApproveCandidateDto } from "dtos/posts/approveCandidate";
import { CandidateStatus } from "enums/post/post.enum";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PostsManageService {
    constructor(
        @InjectModel(Post.name)
        private readonly postModel: Model<Post>,
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

    async applyJob(applyJobDto: ApplyJobDto, applierId: string) {
        const postOwnerAuthentication =
            await this.postService.checkPostOwnerPermission(
                applierId,
                applyJobDto.postId
            );

        if (postOwnerAuthentication) {
            throw new Error(POST_ERROR_MESSAGE.POST_OWNER);
        }

        const readPostPermission =
            await this.permissionsService.checkPermission(
                applierId,
                Subject.POST,
                Action.READ,
                AccountType.NORMAL_USER
            );

        if (!readPostPermission) {
            throw new Error(ERROR_MESSAGE.NO_PERMISSION);
        }

        const isAlreadyApplied = await this.postModel.findOne(
            checkAlreadyApplyQueryBuilder(applierId, applyJobDto.postId)
        );

        if (!_.isEmpty(isAlreadyApplied)) {
            throw new Error(POST_ERROR_MESSAGE.ALREADY_APPLY);
        }

        const appliedJob = await this.postModel.updateOne(
            { _id: applyJobDto.postId },
            applyJobQueryBuilder(applyJobDto, applierId)
        );

        if (!!appliedJob.nModified) {
            return applyJobDto;
        }

        throw new Error(COMMON_MESSAGE.BAD_REQUEST);
    }

    async approveCandidate(
        approveCandidateDto: ApproveCandidateDto,
        ownerId: string
    ) {
        const updatePermissionChecked = this.permissionsService.checkPermission(
            ownerId,
            Subject.POST,
            Action.UPDATE,
            AccountType.NORMAL_USER
        );
        const postAuthentication = this.postService.checkPostOwnerPermission(
            ownerId,
            approveCandidateDto.postId
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
            const post = await this.postsQueryService.getById(
                approveCandidateDto.postId
            );
            const candidateInformation = _.find(
                post.candidates,
                (candidateData) =>
                    candidateData.candidate._id ===
                    approveCandidateDto.candidateId
            );

            if (
                !candidateInformation ||
                candidateInformation.status !== CandidateStatus.APPLIED
            ) {
                throw new Error(COMMON_MESSAGE.FAILED);
            }

            const updatedPost = await this.postModel.updateOne(
                {
                    _id: approveCandidateDto.postId,
                    candidates: {
                        candidate: {
                            _id: approveCandidateDto.candidateId,
                        },
                    },
                } as any,
                {
                    $set: {
                        "candidates.$.status": CandidateStatus.APPROVED,
                    },
                }
            );

            if (updatedPost) {
                return updatedPost;
            }

            throw new Error(COMMON_MESSAGE.BAD_REQUEST);
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }

    async closeJob(postId: string, ownerId: string) {
        const updatePermissionChecked = this.permissionsService.checkPermission(
            ownerId,
            Subject.POST,
            Action.UPDATE,
            AccountType.NORMAL_USER
        );
        const postAuthentication = this.postService.checkPostOwnerPermission(
            ownerId,
            postId
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
            const updatedPost = await this.postsQueryService.updateOne(postId, {
                isClosed: true,
            });

            if (updatedPost) {
                return updatedPost;
            }

            throw new Error(COMMON_MESSAGE.BAD_REQUEST);
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }
}
