import { PermissionsService } from "permissions/services/permissions.service";
import { JwtHandlerService } from "services/jwtHandler.service";
import { PostsService } from "posts/services/posts.service";
import { NewPostDto } from "dtos/posts/newPost.dto";
import {
    Body,
    Controller,
    HttpStatus,
    Put,
    Req,
    Res,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { Post } from "@nestjs/common";
import { COMMON_MESSAGE } from "enums/message/message.enum";
import { Action, Subject } from "enums/auth/auth.enum";
import { EditPostDto } from "dtos/posts/post.dto";
import { AccountType } from "enums/user/user.enum";

@Controller("posts")
export class PostsController {
    constructor(
        private postsService: PostsService,
        private jwtHandlerService: JwtHandlerService,
        private permissionsService: PermissionsService
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
            return res
                .status(HttpStatus.CREATED)
                .json({ message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR, error });
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
        } catch (error) {
            console.error(error);
            return res
                .status(HttpStatus.CREATED)
                .json({ message: COMMON_MESSAGE.INTERNAL_SERVER_ERROR, error });
        }
    }
}
