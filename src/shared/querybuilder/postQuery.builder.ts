import { GetWallPostDto } from "dtos/posts/getWallJob.dto";
import { ApplyJobDto } from "dtos/posts/applyJob.dto";
import { GetNewsFeedPostDto } from "dtos/posts/getNewsFeed.dto";
export const checkPostOwnerQueryBuilder = (userId, postId): Object => {
    return {
        owner: {
            $in: [userId],
        },
        _id: postId,
        disabled: false,
    };
};

export const checkAlreadyApplyQueryBuilder = (userId, postId): Object => {
    return {
        _id: postId,
        "candidates.candidate": userId,
    } as Object;
};

export const applyJobQueryBuilder = (
    applyJobDto: ApplyJobDto,
    userId
): Object => {
    return {
        _id: applyJobDto.postId,
        $push: {
            candidates: {
                candidate: {
                    _id: userId,
                },
                message: applyJobDto.summaryMessage,
                appliedTime: Date.now(),
            },
        },
    };
};

export const getWallPostQueryBuilder = (
    getWallPostDto: GetWallPostDto
): Object => {
    return {
        _id: getWallPostDto.userId,
        wallFeed: {
            $slice: [getWallPostDto.offset, getWallPostDto.limit],
        },
    };
};

export const getNewsFeedPostQueryBuilder = (
    getWallPostDto: GetNewsFeedPostDto,
    userId: string
): Object => {
    return {
        _id: userId,
        newsFeed: {
            $slice: [getWallPostDto.offset, getWallPostDto.limit],
        },
    };
};
