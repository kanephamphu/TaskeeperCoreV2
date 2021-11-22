import { PostsManageService } from "posts/services/postsManage.service";
import { JwtHandlerService } from "services/jwtHandler.service";
import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { AddNewOwnersDto } from "dtos/posts/addNewOwners.dto";
import { COMMON_MESSAGE } from "enums/message/message.enum";
import { ApplyJobDto } from "dtos/posts/applyJob.dto";
import { ClosePostDto } from "dtos/posts/closeJob.dto";
import { ApproveCandidateDto } from "dtos/posts/approveCandidate";
import * as _ from "lodash";

@Controller("postsManage")
export class PostsManageController {
    constructor(
        private jwtHandlerService: JwtHandlerService,
        private postsManageService: PostsManageService
    ) {}

    @Post("addNewOwner")
    @UsePipes(new ValidationPipe({ transform: true }))
    async addNewOwner(
        @Res() res,
        @Body() addNewOwnersDto: AddNewOwnersDto,
        @Req() req
    ) {
        try {
            const userId = this.jwtHandlerService.getUserIdFromJwt(
                req.headers.authorization
            );
            const post = await this.postsManageService.addPostOwners(
                addNewOwnersDto,
                userId
            );

            if (post) {
                return res
                    .status(HttpStatus.ACCEPTED)
                    .json({ message: COMMON_MESSAGE.SUCCESS, data: post });
            }
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.BAD_REQUEST,
                error: error.message,
            });
        }
    }

    @Post("apply")
    @UsePipes(new ValidationPipe({ transform: true }))
    async applyJob(@Res() res, @Body() applyJobDto: ApplyJobDto, @Req() req) {
        try {
            const userId = this.jwtHandlerService.getUserIdFromJwt(
                _.get(req.headers, "authorization")
            );
            const appliedJob = await this.postsManageService.applyJob(
                applyJobDto,
                userId
            );

            if (appliedJob) {
                return res.status(HttpStatus.ACCEPTED).json({
                    message: COMMON_MESSAGE.SUCCESS,
                    data: appliedJob,
                });
            }
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.BAD_REQUEST,
                error: error.message,
            });
        }
    }

    @Post("approveCandidate")
    @UsePipes(new ValidationPipe({ transform: true }))
    async approveCandidate(
        @Res() res,
        @Body() approveCandidate: ApproveCandidateDto,
        @Req() req
    ) {
        try {
            const userId = this.jwtHandlerService.getUserIdFromJwt(
                _.get(req.headers, "authorization")
            );
            const approvedJob = await this.postsManageService.approveCandidate(
                approveCandidate,
                userId
            );

            if (approvedJob) {
                return res.status(HttpStatus.ACCEPTED).json({
                    message: COMMON_MESSAGE.SUCCESS,
                    data: approvedJob,
                });
            }

            return res.status(HttpStatus.BAD_GATEWAY).json({
                message: COMMON_MESSAGE.FAILED,
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.BAD_REQUEST,
                error: error.message,
            });
        }
    }

    @Post("closeJob")
    @UsePipes(new ValidationPipe({ transform: true }))
    async closeJob(@Res() res, @Body() closePostDto: ClosePostDto, @Req() req) {
        try {
            const userId = this.jwtHandlerService.getUserIdFromJwt(
                _.get(req.headers, "authorization")
            );
            const closedJob = await this.postsManageService.closeJob(
                closePostDto.postId,
                userId
            );

            if (closedJob) {
                return res.status(HttpStatus.ACCEPTED).json({
                    message: COMMON_MESSAGE.SUCCESS,
                    data: closedJob,
                });
            }
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.BAD_REQUEST,
                error: error.message,
            });
        }
    }
}
