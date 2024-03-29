import { TagsService } from "tags/services/tags.service";
import { SearchTagsDto } from "dtos/tags/searchTag.dto";
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";

@Controller("tags")
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @Post("search")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async searchTagsLight(
        @Res() res,
        @Body() searchTagsDto: SearchTagsDto
    ) {
        try {
            const tags = await this.tagsService.searchTags(searchTagsDto);

            if (tags) {
                return res.status(HttpStatus.OK).json({ data: tags });
            }
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: error.message,
            });
        } finally {
            return res.status(HttpStatus.NOT_FOUND).json({});
        }
    }
}
