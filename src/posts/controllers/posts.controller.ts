import { JwtService } from "@nestjs/jwt";
import { PostsService } from "posts/services/posts.service";
import { NewPostDto } from "dtos/posts/newPost.dto";
import {
    Body,
    Controller,
    HttpStatus,
    Req,
    Res,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { Post } from "@nestjs/common";
import { COMMON_MESSAGE } from "enums/message/message.enum";

@Controller("posts")
export class PostsController {
    constructor(
        private postsService: PostsService,
        private jwtService: JwtService
    ) {}
    @Post("addNewPost")
    @UsePipes(new ValidationPipe({ transform: true }))
    async addNewPost(@Res() res, @Body() newPostDto: NewPostDto, @Req() req) {
        try {
            const jwt = req.headers.authorization.replace("Bearer ", "");
            const jwtInfo = this.jwtService.decode(jwt, { json: true }) as {
                _id: string;
            };
            const post = await this.postsService.addPost(
                newPostDto,
                jwtInfo._id
            );

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
