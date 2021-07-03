import { CodeTablesService } from "codetable/codetable.service";
import { EncodingType } from "enums/codetable/codetableDirectories.enum";
import {
    CACHE_MANAGER,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Query,
    Res,
} from "@nestjs/common";
import { LanguageCode } from "enums/codetable/language.enum";
import { CodeTableDir } from "enums/codetable/codetableDirectories.enum";
import * as fs from "fs";
import { CODE_TABLE } from "enums/codetable/cache.enum";
import { Cache } from "cache-manager";
import { CODE_TABLE_MESSAGE } from "enums/message/message.enum";

@Controller("codetables")
export default class CodeTablesController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private codeTableService: CodeTablesService
    ) {}
    rootCodeTableDir = "src/codetable/root";

    @Get("isdcode")
    async getISDCode(@Res() res, @Query() req) {
        const languageCode: LanguageCode =
            req.languageCode || LanguageCode.US_ENG;
        const cacheKey = `${CODE_TABLE}${languageCode}`;
        let isdCodeData = await this.cacheManager.get(cacheKey);
        if (!isdCodeData) {
            const codeTableXml = `${this.rootCodeTableDir}/${languageCode}/${CodeTableDir.ISD_CODE}`;

            const xmlISDData = await fs.readFileSync(
                codeTableXml,
                EncodingType.UTF8
            );

            isdCodeData = this.codeTableService.handleCodeTable(
                xmlISDData,
                CODE_TABLE.ISD_CODE
            );

            await this.cacheManager.set(cacheKey, isdCodeData);
        }

        return res.status(HttpStatus.OK).json({
            message: CODE_TABLE_MESSAGE.SUCCESS,
            data: isdCodeData,
        });
    }

    @Get("language")
    async getLanguageCode(@Res() res, @Query() req) {
        const languageCode: LanguageCode =
            req.languageCode || LanguageCode.US_ENG;
        const cacheKey = `${CODE_TABLE}${languageCode}`;
        let isdCodeData = await this.cacheManager.get(cacheKey);
        if (!isdCodeData) {
            const codeTableXml = `${this.rootCodeTableDir}/${languageCode}/${CodeTableDir.LANGUAGE_CODE}`;

            const xmlISDData = await fs.readFileSync(
                codeTableXml,
                EncodingType.UTF8
            );

            isdCodeData = this.codeTableService.handleCodeTable(
                xmlISDData,
                CODE_TABLE.LANGUAGE_CODE
            );

            await this.cacheManager.set(cacheKey, isdCodeData);
        }

        return res.status(HttpStatus.OK).json({
            message: CODE_TABLE_MESSAGE.SUCCESS,
            data: isdCodeData,
        });
    }
}
