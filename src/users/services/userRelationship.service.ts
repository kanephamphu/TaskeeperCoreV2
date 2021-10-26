import { COMMON_MESSAGE } from "enums/message/message.enum";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User } from "schemas/user/user.schema";
import { Connection, Model } from "mongoose";
import { InjectQueryService, QueryService } from "@nestjs-query/core";

@Injectable()
export class UserRelationshipService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectQueryService(User)
        private readonly usersQueryService: QueryService<User>,
        @InjectConnection() private readonly connection: Connection
    ) {}

    async addFollower(userId: string, followerId: string) {
        const checkExisting = await this.usersQueryService.query({
            _id: userId,
            follower: { _id: followerId },
        } as any);

        if (checkExisting) {
            throw new Error(COMMON_MESSAGE.BAD_REQUEST);
        }

        const transaction = await this.connection.startSession();
        try {
            transaction.startTransaction();

            const requests = [
                this.userModel.updateOne(
                    { _id: userId },
                    { $push: { follower: { _id: followerId } } }
                ),
                this.userModel.updateOne(
                    { _id: followerId },
                    { $push: { following: { _id: userId } } }
                ),
            ];

            const responses = await Promise.all(requests);

            if (_.chain(responses).compact().size().value() === 2) {
                return true;
            }

            await transaction.abortTransaction();
        } catch (error) {
            await transaction.abortTransaction();
        } finally {
            transaction.endSession();
        }
    }
}
