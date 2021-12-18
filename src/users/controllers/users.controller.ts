import { ErrorHandlerService } from "services/errorHandler.service";
import FollowUserDto from "dtos/user/followUser.dto";
import { CreateUserDto } from "dtos/user/createUser.dto";
import { UsersService } from "users/services/users.service";
import {
    Controller,
    Body,
    Res,
    Post,
    HttpStatus,
    UsePipes,
    ValidationPipe,
    UseGuards,
    HttpException,
    UseInterceptors,
    UploadedFile,
    Req,
    Get,
    Query,
    Put,
} from "@nestjs/common";
import { SEARCH_TAGS, COMMON_MESSAGE } from "enums/message/message.enum";
import * as _ from "lodash";
import { MailService } from "mail/mail.service";
import FirstTimeTagsDto from "dtos/user/firstTimeTags.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import MulterGoogleStorage from "multer-google-storage";
import { JwtHandlerService } from "services/jwtHandler.service";
import { UserRelationshipService } from "users/services/userRelationship.service";
import { SearchUsersDto } from "dtos/user/searchUser.dto";
import { EditUserDto } from "dtos/user/editUser.dto";

@Controller("users")
export default class UserController {
    constructor(
        private usersService: UsersService,
        private mailService: MailService,
        private errorHandlerService: ErrorHandlerService,
        private jwtHandlerService: JwtHandlerService,
        private userRelationshipService: UserRelationshipService
    ) {}

    @Post("create")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async create(@Res() res, @Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.usersService.create(createUserDto);

            if (user) {
                const { verifyInformation, loginInformation, ...data } =
                    user.toObject();
                this.mailService.sendUserVerification(user);
                return res
                    .status(HttpStatus.CREATED)
                    .json({ message: SEARCH_TAGS.SUCCESS, data });
            }
        } catch (error) {
            console.error(error);
            //Todo: Error Handler
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR,
                error,
            });
        } finally {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: SEARCH_TAGS.NOT_FOUND });
        }
    }

    @Get("getUser")
    public async get(@Req() req, @Res() res, @Query() query) {
        try {
            const userId: string = query.userId;

            if (!userId) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json({ message: COMMON_MESSAGE.BAD_REQUEST });
            }

            const user = await this.usersService.getUser(userId);

            if (user) {
                return res
                    .status(HttpStatus.FOUND)
                    .json({ message: COMMON_MESSAGE.SUCCESS, data: user });
            }
        } catch (error) {
            console.error(error);
            //Todo: Error Handler
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR,
                error,
            });
        } finally {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: SEARCH_TAGS.NOT_FOUND });
        }
    }

    @Post("handleFirstTimeLogin")
    public async addTags(
        @Res() res,
        @Body() firstTimeTagsDto: FirstTimeTagsDto
    ) {
        try {
            const success = await this.usersService.handleFirstTimeTags(
                firstTimeTagsDto
            );

            if (success) {
                res.status(HttpStatus.CREATED).json({
                    success,
                });
            }
        } catch (error) {
            const errorHandled: HttpException =
                this.errorHandlerService.handleError(error);
            res.status(errorHandled.getStatus()).json(
                errorHandled.getResponse()
            );
        }
    }

    @Post("follow")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async followUser(
        @Res() res,
        @Body() followUserDto: FollowUserDto,
        @Req() req
    ) {
        try {
            const userId = this.jwtHandlerService.getUserIdFromJwt(
                req.headers.authorization
            );
            if (!userId) {
                return res
                    .status(HttpStatus.NOT_FOUND)
                    .json({ message: COMMON_MESSAGE.FAILED });
            }

            const success = await this.userRelationshipService.addFollower(
                followUserDto.userId,
                userId
            );

            if (success) {
                res.status(HttpStatus.OK).json({
                    success,
                });
            }
        } catch (error) {
            const errorHandled: HttpException =
                this.errorHandlerService.handleError(error);
            res.status(errorHandled.getStatus()).json(
                errorHandled.getResponse()
            );
        }
    }

    @Get("getTopRecruiters")
    async getTopRecruiters(@Req() req, @Res() res) {
        try {
            const data = await this.usersService.getTopRecruiters();

            if (data) {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: COMMON_MESSAGE.SUCCESS, data: data });
            }
        } catch (err) {
            const errorHandled: HttpException =
                this.errorHandlerService.handleError(err);

            res.status(errorHandled.getStatus()).json(
                errorHandled.getResponse()
            );
        }
    }

    @Post("searchUsers")
    @UsePipes(new ValidationPipe({ transform: true }))
    async searchUsers(
        @Req() req,
        @Res() res,
        @Body() searchUsersDto: SearchUsersDto
    ) {
        try {
            const data = await this.usersService.searchUsers(searchUsersDto);

            if (data) {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: COMMON_MESSAGE.SUCCESS, data: data });
            }
        } catch (err) {
            const errorHandled: HttpException =
                this.errorHandlerService.handleError(err);

            res.status(errorHandled.getStatus()).json(
                errorHandled.getResponse()
            );
        }
    }

    @Post("edit")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async edit(
        @Res() res,
        @Req() req,
        @Body() editUserDto: EditUserDto
    ) {
        try {
            const userId = this.jwtHandlerService.getUserIdFromJwt(
                req.headers.authorization
            );
            if (!userId) {
                return res
                    .status(HttpStatus.NOT_FOUND)
                    .json({ message: COMMON_MESSAGE.FAILED });
            }
            const user = await this.usersService.edit(editUserDto, userId);

            if (user) {
                const { verifyInformation, loginInformation, ...data } = user;
                return res
                    .status(HttpStatus.OK)
                    .json({ message: SEARCH_TAGS.SUCCESS, data });
            }
        } catch (error) {
            console.error(error);
            //Todo: Error Handler
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR,
                error: error.message,
            });
        } finally {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: SEARCH_TAGS.NOT_FOUND });
        }
    }
}
