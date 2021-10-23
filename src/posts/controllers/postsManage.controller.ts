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

@Controller("postsManage")
export class PostsController {
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
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: COMMON_MESSAGE.BAD_REQUEST, error });
        }
    }
}
