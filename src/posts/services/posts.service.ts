import { UsersService } from "./../../users/services/users.service";
import { User } from "schemas/user/user.schema";
import { GetWallPostDto } from "dtos/posts/getWallJob.dto";
import { UserRelationshipService } from "users/services/userRelationship.service";
import { COMMON_MESSAGE, ERROR_MESSAGE } from "enums/message/message.enum";
import { EditPostDto } from "dtos/posts/post.dto";
import { NewPostDto } from "dtos/posts/newPost.dto";
import { Post } from "schemas/post/post.schema";
import { InjectQueryService, QueryService } from "@nestjs-query/core";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import {
    checkPostOwnerQueryBuilder,
    getWallPostQueryBuilder,
} from "shared/querybuilder/postQuery.builder";
import { PermissionsService } from "permissions/services/permissions.service";
import { Action, Subject } from "enums/auth/auth.enum";
import { AccountType } from "enums/user/user.enum";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GetNewsFeedPostDto } from "dtos/posts/getNewsFeed.dto";
import { FILE_LOCATION, MimeType } from "enums/common/type.enum";
import { uuid } from "@supercharge/strings/dist";
import * as AWS from "aws-sdk";

@Injectable()
export class PostsService {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || "taskeeper1";
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY || "AKIASLXTCDRPPYKRNU76",
        secretAccessKey:
            process.env.AWS_S3_KEY_SECRET ||
            "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",
    });

    constructor(
        @InjectQueryService(Post)
        private readonly postsQueryService: QueryService<Post>,
        @InjectModel(Post.name)
        private readonly postModel: Model<Post>,
        private permissionsService: PermissionsService,
        private userRelationshipService: UserRelationshipService,
        private usersService: UsersService
    ) {}

    async getPost(userId, postId) {
        const readPermissionChecked =
            await this.permissionsService.checkPermission(
                userId,
                Subject.POST,
                Action.READ
            );

        if (readPermissionChecked) {
            const postData = await this.postsQueryService.findById(postId);

            if (postData && !postData.disabled[0]) {
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
        const createPermissionChecked =
            await this.permissionsService.checkPermission(
                userId,
                Subject.POST,
                Action.CREATE,
                AccountType.NORMAL_USER
            );
        if (!createPermissionChecked) {
            throw new Error(ERROR_MESSAGE.NO_PERMISSION);
        }
        const newPost = _.assign(newPostDto, {
            userId,
            owner: [{ _id: userId }],
            disabled: false,
        });
        const createdPost = await this.postsQueryService.createOne(newPost);

        if (createdPost) {
            this.userRelationshipService.addFollowersNewsFeed(
                userId,
                createdPost._id.toString()
            );
            this.userRelationshipService.addUserWall(
                userId,
                createdPost._id.toString()
            );

            return createdPost;
        }

        throw new Error(COMMON_MESSAGE.BAD_REQUEST);
    }

    async editPost(
        editedPost: EditPostDto,
        userId: string
    ): Promise<Error | Post | Boolean> {
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
            const editedPostId = editedPost._id;
            delete editedPost._id;
            const updatedPost = await this.postModel.updateOne(
                { _id: editedPostId },
                editedPost
            );

            if (updatedPost.nModified) {
                return true;
            }

            throw new Error(COMMON_MESSAGE.BAD_REQUEST);
        }

        throw new Error(ERROR_MESSAGE.NO_PERMISSION);
    }

    async deletePost(deletedPostId: string, userId: string) {
        const deletePostPermissionChecked =
            this.permissionsService.checkPermission(
                userId,
                Subject.POST,
                Action.UPDATE,
                AccountType.NORMAL_USER
            );
        const postAuthentication = this.checkPostOwnerPermission(
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

    async checkPostOwnerPermission(
        userId: string,
        postId: string
    ): Promise<Error | boolean> {
        const postOwnerQuery = checkPostOwnerQueryBuilder(userId, postId);
        const postPermissionChecked = await this.postModel.findOne(
            postOwnerQuery
        );

        if (postPermissionChecked) {
            return true;
        }

        return false;
    }

    async getWallPosts(
        getWallPostDto: GetWallPostDto
    ): Promise<Error | Post[]> {
        const postIds = await this.usersService.getWallPostIds(getWallPostDto);

        return this.postModel.find({ _id: { $in: postIds }, disabled: false });
    }

    async getNewsFeedPosts(
        getNewsFeedDto: GetNewsFeedPostDto,
        userId: string
    ): Promise<Error | Post[]> {
        const postIds = await this.usersService.getNewsFeedPostIds(
            getNewsFeedDto,
            userId
        );

        return this.postModel.find({ _id: { $in: postIds }, disabled: false });
    }

    public async saveImage(file: Express.Multer.File, userId: string, postId) {
        if (
            file.mimetype === MimeType.JPEG ||
            file.mimetype === MimeType.BMP ||
            file.mimetype === MimeType.PNG ||
            file.mimetype === MimeType.TIFF
        ) {
            const updatePermissionChecked =
                this.permissionsService.checkPermission(
                    userId,
                    Subject.POST,
                    Action.UPDATE,
                    AccountType.NORMAL_USER
                );
            const postAuthentication = this.checkPostOwnerPermission(
                userId,
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
                file.filename = `${uuid()}.${file.mimetype.split("/")[1]}`;
                const url = await this.uploadFile(file);
                const userData = await this.postsQueryService.updateOne(
                    postId,
                    {
                        images: [url],
                    }
                );

                return userData;
            }

            throw new Error(ERROR_MESSAGE.NO_PERMISSION);
        }

        throw new Error(ERROR_MESSAGE.WRONG_TYPE_FILE);
    }

    uploadFile(file) {
        const { filename } = file;

        return this.s3_upload(
            file.buffer,
            this.AWS_S3_BUCKET,
            filename,
            file.mimetype
        );
    }

    async s3_upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ACL: "public-read",
            ContentType: mimetype,
            ContentDisposition: "inline",
            CreateBucketConfiguration: {
                LocationConstraint: "us-east-2",
            },
        };

        try {
            let s3Response = await this.s3.upload(params).promise();

            return s3Response.Location;
        } catch (e) {
            console.log(e);
        }
    }
}
