export interface User {
    authenticationInformation: {
        email: string;
        phoneNumber: string;
        ISDCodeId: string;
        password: string;
        facebookLoginInformation: {};
        googleLoginInformation: {};
    };
    createdAt: Date;
    modifiedAt: Date;
    firstName: string;
    lastName: string;
    additionalName?: string;
    avatar?: string;
    gender: string;
    description: string;
    website: [string];
    dateOfBirth: Date;
    nationality: string;
    emailChangeHistory: [string];
    displayPhoneNumber: {
        phoneNumber: string;
        isHidden: boolean;
    };
    displayEmail: {
        email: string;
        isHidden: boolean;
    };
    phoneNumberChangeHistory: [string];
    workingInformation: [
        {
            companyName: string;
            position: string;
            location: string;
            description: string;
            timePeriod: {
                type: string;
                fromTime: Date;
                toTime: Date;
            };
        }
    ];
    educationInformation: [
        {
            trainingCompanyName: string;
            position: string;
            location: string;
            description: string;
            timePeriod: {
                type: string;
                fromTime: Date;
                toTime: Date;
            };
        }
    ];
    votes: [
        {
            voterId: string;
            votePoint: string;
            voterFirstName: string;
            voterLastName: string;
            voterAvatar: string;
            voterComment: string;
        }
    ];
    followers: [
        {
            followerId: string;
            followerFirstName: string;
            followerLastName: string;
            followerAvatar: string;
        }
    ];
    following: [
        {
            followingId: string;
            followingFirstName: string;
            followingLastName: string;
            followingAvatar: string;
        }
    ];
    tags: [string];
    languageIds: [string];
    searchHistories: [
        {
            searchString: string;
            searchCount: number;
            lastTime: Date;
        }
    ];
    postsAccessHistories: [
        {
            postId: string;
            lastTime: Date;
        }
    ];
    interestedPosts: [
        {
            postId: string;
            postOwnerId: string;
            postOwnerAvatar: string;
            postOwnerFirstName: string;
            postOwnerLastName: string;
            postTitle: string;
        }
    ];
    currentLocation: {
        location: string;
        coordinates: [number];
        isHidden: boolean;
    };
    locationHistories: [
        {
            type: string;
            coordinates: [number];
            time: Date;
        }
    ];
}
