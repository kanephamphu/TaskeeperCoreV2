import { JwtHandlerService } from "services/jwtHandler.service";
import { PostsService } from "posts/services/posts.service";
import { NewPostDto } from "dtos/posts/newPost.dto";
import { DeletePostDto } from "dtos/posts/deletePost.dto";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Put,
    Query,
    Req,
    Res,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { Post } from "@nestjs/common";
import { COMMON_MESSAGE } from "enums/message/message.enum";
import { EditPostDto } from "dtos/posts/post.dto";

@Controller("posts")
export class PostsController {
    constructor(
        private postsService: PostsService,
        private jwtHandlerService: JwtHandlerService
    ) {}

    @Post("addNewPost")
    @UsePipes(new ValidationPipe({ transform: true }))
    async addNewPost(@Res() res, @Body() newPostDto: NewPostDto, @Req() req) {
        try {
            const userId = this.jwtHandlerService.getUserIdFromJwt(
                req.headers.authorization
            );
            const post = await this.postsService.addPost(newPostDto, userId);

            if (post) {
                return res
                    .status(HttpStatus.CREATED)
                    .json({ message: COMMON_MESSAGE.SUCCESS, data: post });
            }
        } catch (error) {
            console.error(error);
            return res.status(HttpStatus.CREATED).json({
                message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR,
                error: error.message,
            });
        }
    }

    @Put("editPost")
    @UsePipes(new ValidationPipe({ transform: true }))
    async editPost(@Res() res, @Body() editPostDto: EditPostDto, @Req() req) {
        try {
            const userId = this.jwtHandlerService.getUserIdFromJwt(
                req.headers.authorization
            );
            const post = await this.postsService.editPost(editPostDto, userId);

            if (post) {
                return res
                    .status(HttpStatus.CREATED)
                    .json({ message: COMMON_MESSAGE.SUCCESS, data: post });
            }

            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ message: COMMON_MESSAGE.FAILED });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR,
                error: error.message,
            });
        }
    }

    @Delete("deletePost")
    @UsePipes(new ValidationPipe({ transform: true }))
    async deletePost(
        @Res() res,
        @Body() deletePost: DeletePostDto,
        @Req() req
    ) {
        try {
            const userId = this.jwtHandlerService.getUserIdFromJwt(
                req.headers.authorization
            );
            const post = await this.postsService.deletePost(
                deletePost._id,
                userId
            );

            if (post) {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: COMMON_MESSAGE.SUCCESS, data: post });
            }

            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ message: COMMON_MESSAGE.FAILED });
        } catch (error) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: COMMON_MESSAGE.FAILED, error: error.message });
        }
    }

    @Get("getPost")
    async getPost(@Req() req, @Res() res, @Query() query) {
        try {
            const postId = query.postId;

            if (!!postId) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json({ message: COMMON_MESSAGE.BAD_REQUEST });
            }

            const userId = this.jwtHandlerService.getUserIdFromJwt(
                req.headers.authorization
            );
            const post = await this.postsService.getPost(userId, postId);

            if (post) {
                return res
                    .status(HttpStatus.FOUND)
                    .json({ message: COMMON_MESSAGE.SUCCESS, data: post });
            }

            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ message: COMMON_MESSAGE.BAD_REQUEST });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR,
                error: error.message,
            });
        }
    }
}
