export const checkPostOwnerQueryBuilder = (userId, postId): Object => {
    return {
        owner: {
            $in: [userId],
        },
        _id: postId,
    };
};
