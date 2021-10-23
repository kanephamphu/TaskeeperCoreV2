import { JwtService } from "@nestjs/jwt";
import * as _ from "lodash";
export class JwtHandlerService {
    constructor(private jwtService: JwtService) {}

    getUserIdFromJwt(jwt: string) {
        const jwtToken = _.chain(jwt).split(" ").last().value();
        const jwtInfo = this.jwtService.decode(jwtToken, {
            json: true,
        }) as {
            _id: string;
        };

        return jwtInfo._id;
    }
}
