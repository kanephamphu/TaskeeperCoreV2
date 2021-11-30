import { COMMON_MESSAGE } from "enums/message/message.enum";
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User } from "schemas/user/user.schema";
import { Connection, Model } from "mongoose";
import UserRatingDto from "dtos/user/userRating.dto";

@Injectable()
export class UserRelationshipService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectConnection() private readonly connection: Connection
    ) {}

    async addFollower(userId: string, followerId: string) {
        const query = {
            _id: userId,
            follower: { _id: followerId },
        };

        const checkExisting = await this.userModel.findOne(query as Object);

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

    async voteUser(userId: string, userRatingDto: UserRatingDto) {
        const isExisting = await this.checkRatingExisting(
            userId,
            userRatingDto.targetUserId
        );

        if (isExisting) {
        }
    }

    async addUserWall(userId: string, postId: string): Promise<User> {
        const data = await this.userModel.findOneAndUpdate(
            { _id: userId },
            { $push: { wallFeed: { $each: [{ _id: postId }], $position: 0 } } }
        );

        return data;
    }

    async addFollowersNewsFeed(userId: string, postId): Promise<void | Error> {
        const user = await this.userModel.findById(userId);
        const followerIds = _.map(
            user.follower,
            (followerData) => followerData._id
        );

        await this.userModel.updateMany(
            { _id: { $in: followerIds } },
            { $push: { newsFeed: { $each: [{ _id: postId }], $position: 0 } } }
        );
    }

    private async addNewRating(userId: string, userRatingDto: UserRatingDto) {}

    private async updateRating(userId: string, userRatingDto: UserRatingDto) {}

    private async checkRatingExisting(
        userId: string,
        targetUserId: string
    ): Promise<Boolean | Error> {
        const existingRating = await this.userModel.findOne({
            _id: targetUserId,
            "userRating.user": userId,
        });

        if (existingRating) {
            return true;
        }

        return false;
    }
}
