import { EditUserDto } from "./../../dtos/user/editUser.dto";
import FirstTimeTagsDto from "dtos/user/firstTimeTags.dto";
import { ChangePasswordByTokenDto } from "dtos/auth/changePasswordByToken.dto";
import { MailService } from "mail/mail.service";
import { ForgotPasswordDto } from "dtos/auth/forgotPassword.dto";
import { AccountStatus } from "enums/user/user.enum";
import { compareDateTime, COMPARE_TYPE } from "shared/utils/dateHelper";
import { getLanguageCodeByISDCode } from "shared/utils/codeTableHelper";
import {
    buildVerificationInformation,
    buildInitialPermissions,
} from "shared/querybuilder/verifyInformation.builder";
import { buildJwtPayload } from "shared/utils/authHelper";
import { hashPassword, comparePasswords } from "shared/utils/stringHelper";
import {
    buildLoginQuery,
    buildForgotPasswordQuery,
    firstTimeTagsQueryBuilder,
    searchUsersQueryBuilder,
} from "shared/querybuilder/userQuery.builder";
import UserLoginDto from "dtos/user/login.dto";
import { CreateUserDto } from "dtos/user/createUser.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "schemas/user/user.schema";
import { Error, Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { VerificationType } from "enums/user/user.enum";
import { ERROR_MESSAGE, COMMON_MESSAGE } from "enums/message/message.enum";
import { NumberVerifyDto } from "dtos/auth/numberVerify.dto";
import {
    InjectQueryService,
    QueryService,
    GetByIdOptions,
} from "@nestjs-query/core";
import {
    getNewsFeedPostQueryBuilder,
    getWallPostQueryBuilder,
} from "shared/querybuilder/postQuery.builder";
import { GetWallPostDto } from "dtos/posts/getWallJob.dto";
import { GetNewsFeedPostDto } from "dtos/posts/getNewsFeed.dto";
import { FILE_LOCATION, MimeType } from "enums/common/type.enum";
import { uuid } from "@supercharge/strings/dist";
import * as AWS from "aws-sdk";
import { SearchUsersDto } from "dtos/user/searchUser.dto";
import { Action, Subject } from "enums/auth/auth.enum";
import { AccountType } from "enums/user/user.enum";
import { PermissionsService } from "permissions/services/permissions.service";

@Injectable()
export class UsersService {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || "taskeeper1";
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY || "AKIASLXTCDRPPYKRNU76",
        secretAccessKey:
            process.env.AWS_S3_KEY_SECRET ||
            "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",
    });

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectQueryService(User)
        private readonly usersQueryService: QueryService<User>,
        private jwtService: JwtService,
        private mailService: MailService,
        private permissionsService: PermissionsService
    ) {}

    public async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.loginInformation.password = await hashPassword(
            createUserDto.loginInformation.password
        );
        const verifyInformation = buildVerificationInformation(
            VerificationType.REGISTER
        );
        const languageCode = getLanguageCodeByISDCode(
            createUserDto.phoneNumber.ISD_CodeId
        );
        const permissions = buildInitialPermissions();
        const createdUser = new this.userModel(
            _.assign(createUserDto, {
                verifyInformation,
                languageCode,
                permissions,
            })
        );

        return createdUser.save();
    }

    public async edit(editUserDto: EditUserDto, adminId: string): Promise<any | Error> {
        const userId = editUserDto._id;
        const updatePermissionChecked =
            await this.permissionsService.checkPermission(
                adminId,
                Subject.USER,
                Action.UPDATE,
                AccountType.NORMAL_USER
            );

        if (updatePermissionChecked) {
            delete editUserDto._id;
            const user = await this.userModel.updateOne(
                { _id: userId },
                editUserDto
            );

            return user;
        }

        throw new Error("");
    }

    public async login(userLoginDto: UserLoginDto): Promise<any> {
        const loginQuery = buildLoginQuery(userLoginDto);
        const user = await this.userModel.findOne(loginQuery);
        let isValidate = true;

        if (
            !userLoginDto.loginInformation.facebookToken &&
            !userLoginDto.loginInformation.googleToken
        ) {
            isValidate = await comparePasswords(
                userLoginDto.loginInformation.password,
                user.loginInformation.password
            );
        }

        if (isValidate) {
            const payload = buildJwtPayload(user);

            const resData = {
                access_token: this.jwtService.sign(payload),
            };

            return resData;
        }

        return;
    }

    public async verifyAccountByToken(
        token: string,
        userId: string
    ): Promise<boolean | Error> {
        let user = await this.userModel.findById(userId);

        if (user) {
            if (
                compareDateTime(
                    new Date(),
                    user.verifyInformation.tokenTimeToLive,
                    COMPARE_TYPE.SMALLER_OR_EQUAL
                ) &&
                user.accountStatus === AccountStatus.INACTIVE
            ) {
                if (user.verifyInformation.token === token) {
                    user.verifyInformation.isUsed = true;
                    user.accountStatus = AccountStatus.FIRST_TIME;
                    await this.userModel.updateOne({ _id: userId }, user);
                } else {
                    throw new Error(ERROR_MESSAGE.WRONG_TOKEN);
                }
            } else {
                throw new Error(ERROR_MESSAGE.TOKEN_EXPIRED);
            }
        } else {
            throw new Error(ERROR_MESSAGE.NOT_FOUND);
        }

        return true;
    }

    public async verifyAccountByNumber(
        number: number,
        userId: string
    ): Promise<boolean | Error> {
        let user = await this.userModel.findById(userId);

        if (user) {
            if (
                compareDateTime(
                    new Date(),
                    user.verifyInformation.numberTimeToLive,
                    COMPARE_TYPE.SMALLER_OR_EQUAL
                ) &&
                user.accountStatus === AccountStatus.INACTIVE &&
                user.verifyInformation.verificationType ===
                    VerificationType.REGISTER
            ) {
                if (user.verifyInformation.verifyNumber === number) {
                    user.verifyInformation.isUsed = true;
                    user.accountStatus = AccountStatus.FIRST_TIME;
                    await this.userModel.updateOne({ _id: userId }, user);
                } else {
                    throw new Error(ERROR_MESSAGE.WRONG_NUMBER);
                }
            } else {
                throw new Error(ERROR_MESSAGE.NUMBER_EXPIRED);
            }
        } else {
            throw new Error(ERROR_MESSAGE.NOT_FOUND);
        }

        return true;
    }

    public async handleForgotPassword(
        forgotPasswordDto: ForgotPasswordDto
    ): Promise<string | Error> {
        const forgotPasswordQuery = buildForgotPasswordQuery(forgotPasswordDto);
        const user = await this.userModel.findOne(forgotPasswordQuery);
        const userId = user._id;

        if (user) {
            const verifyInformation = buildVerificationInformation(
                VerificationType.FORGOT_PASSWORD
            );
            await this.userModel.updateOne(
                { _id: userId },
                { verifyInformation }
            );
            const updatedUser = await this.userModel.findById(userId);

            this.mailService.sendForgotPasswordEmail(updatedUser);

            return user._id;
        }

        throw new Error(COMMON_MESSAGE.FAILED);
    }

    public getUser(userId: string) {
        return this.usersQueryService.findById(userId);
    }

    public getUsers(userIds: string[]) {
        return this.userModel.find({ _id: { $in: userIds }, disabled: false });
    }

    public async checkVerifyNumber(
        numberVerifyDto: NumberVerifyDto
    ): Promise<string | Error> {
        const user = await this.userModel.findById(numberVerifyDto.userId);

        if (user) {
            if (
                compareDateTime(
                    new Date(),
                    user.verifyInformation.numberTimeToLive,
                    COMPARE_TYPE.SMALLER_OR_EQUAL
                )
            ) {
                if (
                    user.verifyInformation.verifyNumber ===
                    numberVerifyDto.number
                ) {
                    return user.verifyInformation.token;
                }

                throw new Error(ERROR_MESSAGE.WRONG_NUMBER);
            }

            throw new Error(ERROR_MESSAGE.NUMBER_EXPIRED);
        }

        throw new Error(COMMON_MESSAGE.USER_NOTFOUND);
    }

    public async changePasswordByToken(
        changePasswordByTokenDto: ChangePasswordByTokenDto
    ) {
        const user = await this.userModel.findById(
            changePasswordByTokenDto.userId
        );

        if (user) {
            if (
                compareDateTime(
                    new Date(),
                    user.verifyInformation.tokenTimeToLive,
                    COMPARE_TYPE.SMALLER_OR_EQUAL
                ) &&
                user.verifyInformation.isUsed === false
            ) {
                if (
                    user.verifyInformation.token ===
                        changePasswordByTokenDto.token &&
                    user.verifyInformation.verificationType ===
                        VerificationType.FORGOT_PASSWORD
                ) {
                    const hashedPassword = await hashPassword(
                        changePasswordByTokenDto.password
                    );

                    await this.userModel.updateOne(
                        { _id: changePasswordByTokenDto.userId },
                        {
                            "loginInformation.password": hashedPassword,
                            "verifyInformation.isUsed": true,
                        }
                    );

                    return user._id;
                }

                throw new Error(ERROR_MESSAGE.WRONG_TOKEN);
            }

            throw new Error(ERROR_MESSAGE.TOKEN_EXPIRED);
        }

        throw new Error(COMMON_MESSAGE.USER_NOTFOUND);
    }

    public checkUsersExisting(userIds: string[]): boolean {
        const users = _.map(userIds, (userId) =>
            this.usersQueryService.getById(userId)
        );
        const userResults = Promise.all(users);
        const existingUsersSize = _.chain(userResults)
            .filter(
                (userResult: User) =>
                    userResult.accountStatus === AccountStatus.ACTIVE
            )
            .size()
            .value();

        if (existingUsersSize === _.size(userIds)) {
            return true;
        }

        return false;
    }

    public async handleFirstTimeTags(
        firstTimeTags: FirstTimeTagsDto
    ): Promise<boolean | Error> {
        const verifiedToken = this.jwtService.verify(firstTimeTags.accessToken);

        if (verifiedToken) {
            const user = await this.usersQueryService.getById(
                verifiedToken._id
            );

            if (user && user.accountStatus === AccountStatus.FIRST_TIME) {
                const updateQuery = firstTimeTagsQueryBuilder(
                    firstTimeTags.tagIds
                );

                const result = await this.usersQueryService.updateOne(
                    user._id,
                    updateQuery
                );

                if (result) {
                    return true;
                }

                throw new HttpException(
                    COMMON_MESSAGE.FAILED,
                    HttpStatus.NOT_IMPLEMENTED
                );
            }

            throw new HttpException(
                COMMON_MESSAGE.USER_NOTFOUND,
                HttpStatus.NOT_FOUND
            );
        }

        throw new HttpException(
            COMMON_MESSAGE.UNAUTHORIZED,
            HttpStatus.UNAUTHORIZED
        );
    }

    public async getWallPostIds(
        getWallPostDto: GetWallPostDto
    ): Promise<string[]> {
        const buildGetWallQuery: Object =
            getWallPostQueryBuilder(getWallPostDto);

        const userWall = await this.userModel.findOne(
            { _id: getWallPostDto.userId },
            buildGetWallQuery
        );

        if (userWall) {
            return _.map(userWall.wallFeed, "_id");
        }

        return [];
    }

    public async getNewsFeedPostIds(
        getNewsFeedPostDto: GetNewsFeedPostDto,
        userId: string
    ): Promise<string[]> {
        const getNewsFeedPostQuery: Object =
            getNewsFeedPostQueryBuilder(getNewsFeedPostDto);

        const newsFeed = await this.userModel.findOne(
            { _id: userId },
            getNewsFeedPostQuery
        );

        if (newsFeed) {
            return _.map(newsFeed.newsFeed, "_id");
        }

        return [];
    }

    public async getTopRecruiters(): Promise<User[]> {
        const data = await this.userModel.aggregate([
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    avatar: 1,
                    numberOfJobs: {
                        $cond: {
                            if: { $isArray: "$wallFeed" },
                            then: { $size: "$wallFeed" },
                            else: 0,
                        },
                    },
                },
            },
            {
                $sort: {
                    numberOfJobs: -1,
                },
            },
            { $limit: 5 },
        ]);

        return data;
    }

    searchUsers(searchUsersDto: SearchUsersDto): Promise<User[]> {
        const query = searchUsersQueryBuilder(searchUsersDto);

        return this.usersQueryService.query(query);
    }

    public async saveAvatar(file: Express.Multer.File, userId: string) {
        if (
            file.mimetype === MimeType.JPEG ||
            file.mimetype === MimeType.BMP ||
            file.mimetype === MimeType.PNG ||
            file.mimetype === MimeType.TIFF
        ) {
            file.filename = `${uuid()}.${file.mimetype.split("/")[1]}`;
            const url = await this.uploadFile(file);
            const userData = await this.usersQueryService.updateOne(userId, {
                avatar: url,
            });

            return userData;
        }
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
