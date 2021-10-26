import { ApplyJobDto } from "dtos/posts/applyJob.dto";
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
