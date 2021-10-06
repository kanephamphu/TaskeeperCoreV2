export const checkEditAuthorizationQueryBuilder = (userId, postId): Object => {
    return {
        owner: {
            $in: [userId],
        },
        _id: postId,
    };
};
