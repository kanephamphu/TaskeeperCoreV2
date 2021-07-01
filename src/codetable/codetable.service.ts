import { codeTablesMapper } from "shared/mapper/codetable/codetable.mapper";
import { CodeTableDto } from "dtos/codetable/codetable.dto";
import { Injectable } from "@nestjs/common";
import * as xml from "xml-js";

@Injectable()
export class CodeTablesService {
    mapISDCodeTable(rawCodeData: any): CodeTableDto[] {
        const isdCodeData = JSON.parse(
            xml.xml2json(rawCodeData, {
                compact: true,
                spaces: 4,
            })
        );

        return codeTablesMapper(isdCodeData.xml.ISDCode);
    }
}
