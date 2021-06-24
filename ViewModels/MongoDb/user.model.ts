import { Schema, model, connect } from "mongoose";
import { User } from "../DataModels/user.model";

const schema = new Schema<User>({
    authenticationInformation: {
        email: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        ISDCodeId: {
            type: String,
        },
        password: {
            type: String,
        },
        facebookLoginInformation: {},
        googleLoginInformation: {},
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    additionalName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    gender: {
        type: String,
    },
    description: {
        type: String,
    },
    website: [
        {
            type: String,
        },
    ],
    dateOfBirth: {
        type: Date,
    },
    nationality: {
        type: String,
    },
    emailChangeHistory: [
        {
            type: String,
        },
    ],
    displayPhoneNumber: {
        phoneNumber: {
            type: String,
        },
        isHidden: Boolean,
    },
    displayEmail: {
        email: {
            type: String,
        },
        isHidden: Boolean,
    },
    phoneNumberChangeHistory: [
        {
            type: String,
        },
    ],
    workingInformation: [
        {
            companyName: {
                type: String,
            },
            position: {
                type: String,
            },
            location: {
                type: String,
            },
            description: {
                type: String,
            },
            timePeriod: {
                type: {
                    type: String,
                },
                fromTime: {
                    type: Date,
                },
                toTime: {
                    type: Date,
                },
            },
        },
    ],
    educationInformation: [
        {
            trainingCompanyName: {
                type: String,
            },
            position: {
                type: String,
            },
            location: {
                type: String,
            },
            description: {
                type: String,
            },
            timePeriod: {
                type: {
                    type: String,
                },
                fromTime: {
                    type: Date,
                },
                toTime: {
                    type: Date,
                },
            },
        },
    ],
    votes: [
        {
            voter: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            votePoint: {
                type: String,
            },
            voterComment: {
                type: String,
            },
        },
    ],
    followers: [
        {
            followerId: {
                type: String,
            },
            followerFirstName: {
                type: String,
            },
            followerLastName: {
                type: String,
            },
            followerAvatar: {
                type: String,
            },
        },
    ],
    following: [
        {
            followingId: {
                type: String,
            },
            followingFirstName: {
                type: String,
            },
            followingLastName: {
                type: String,
            },
            followingAvatar: {
                type: String,
            },
        },
    ],
    tags: [
        {
            type: String,
        },
    ],
    languageIds: [
        {
            type: String,
        },
    ],
    searchHistories: [
        {
            searchString: {
                type: String,
            },
            searchCount: Number,
            lastTime: {
                type: Date,
            },
        },
    ],
    postsAccessHistories: [
        {
            postId: {
                type: String,
            },
            lastTime: {
                type: Date,
            },
        },
    ],
    interestedPosts: [
        {
            postId: {
                type: String,
            },
            postOwnerId: {
                type: String,
            },
            postOwnerAvatar: {
                type: String,
            },
            postOwnerFirstName: {
                type: String,
            },
            postOwnerLastName: {
                type: String,
            },
            postTitle: {
                type: String,
            },
        },
    ],
    currentLocation: {
        location: {
            type: String,
        },
        coordinates: [Number],
        isHidden: Boolean,
    },
    locationHistories: [
        {
            type: {
                type: String,
            },
            coordinates: {
                type: [Number],
            },
            time: {
                type: Date,
            },
        },
    ],
    permissions: {
        posts: {
            
        }
        users: {
            read: Boolean;
            create: Boolean;
            update: Boolean;
            delete: Boolean;
        };
        comments: {
            read: Boolean;
            create: Boolean;
            update: Boolean;
            delete: Boolean;
        };
        applyPosts: {
            read: Boolean;
            create: Boolean;
            update: Boolean;
            delete: Boolean;
        };
        approveUsers: {
            read: Boolean;
            create: Boolean;
            update: Boolean;
            delete: Boolean;
        };
    };
    disabled: Boolean;
    role: string;
});

