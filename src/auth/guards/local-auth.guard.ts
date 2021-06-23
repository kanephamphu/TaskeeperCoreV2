import { Injectable } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
    canActivate(context: ExecutionContext) {
        return true;
    }
}
