import _ from "lodash";
import { User } from "schemas/user/user.schema";
export const buildJwtPayload = (userModel: User) => {
    return {
        _id: userModel._id,
        accountType: userModel.accountType,
        accountStatus: userModel.accountStatus,
    };
};
