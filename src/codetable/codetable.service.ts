import { CODE_TABLE } from "enums/codetable/cache.enum";
import { codeTablesMapper } from "shared/mapper/codetable/codetable.mapper";
import { CodeTableDto } from "dtos/codetable/codetable.dto";
import { Injectable } from "@nestjs/common";
import * as xml from "xml-js";
import * as _ from "lodash";

@Injectable()
export class CodeTablesService {
    handleCodeTable(rawCodeData: any, codeKey: CODE_TABLE): CodeTableDto[] {
        const isdCodeData = JSON.parse(
            xml.xml2json(rawCodeData, {
                compact: true,
                spaces: 4,
            })
        );

        return codeTablesMapper(_.get(isdCodeData, `CodeData.${codeKey}`));
    }
}
