import { AccountStatus } from "enums/user/user.enum";
import { COMMON_MESSAGE } from "enums/message/message.enum";
import { AccountType } from "enums/user/user.enum";
import { Action } from "enums/auth/auth.enum";
import { Subject } from "enums/auth/auth.enum";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectQueryService, QueryService } from "@nestjs-query/core";
import { User } from "schemas/user/user.schema";
import * as _ from "lodash";

@Injectable()
export class PermissionsService {
    constructor(
        @InjectQueryService(User)
        private readonly usersQueryService: QueryService<User>
    ) {}

    public async checkPermission(
        userId: string,
        subject: Subject,
        action: Action,
        accountType: AccountType = AccountType.NORMAL_USER,
        targetId?: string
    ): Promise<boolean | Error> {
        const user = await this.usersQueryService.findById(userId);

        if (user.accountStatus !== AccountStatus.ACTIVE) {
            return false;
        }

        if (user.accountType === AccountType.ADMIN) {
            return true;
        }

        if (targetId) {
            switch (subject) {
                case Subject.USER: {
                }
                case Subject.POST: {
                }
                default:
                    return false;
            }
        }

        if (
            user.accountType === accountType &&
            _.get(user, `permissions.${subject}.${action}`)
        ) {
            return true;
        }

        throw new HttpException(
            COMMON_MESSAGE.UNAUTHORIZED,
            HttpStatus.UNAUTHORIZED
        );
    }
}
