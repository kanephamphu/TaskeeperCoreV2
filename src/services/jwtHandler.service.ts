import { JwtService } from "@nestjs/jwt";

export class JwtHandlerService {
    constructor(private jwtService: JwtService) {}

    getUserIdFromJwt(jwt: string) {
        const jwtInfo = this.jwtService.decode(jwt.replace("Bearer ", ""), {
            json: true,
        }) as {
            _id: string;
        };

        return jwtInfo._id;
    }
}
