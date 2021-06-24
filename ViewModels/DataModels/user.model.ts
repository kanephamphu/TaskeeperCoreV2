import { WorkingInformation } from "ViewModels/DataModels/workingInformation.model";
import { EducationInformation } from "ViewModels/DataModels/eduationInformation.model";
import { Permission } from "ViewModels/DataModels/permission.model";

export interface User {
    _id: string;
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
    workingInformation: [WorkingInformation];
    educationInformation: [EducationInformation];
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
    permissions: {
        posts: Permission;
        users: Permission;
        comments: Permission;
        applyPosts: Permission;
        approveUsers: Permission;
    };
    disabled: boolean;
    role: string;
}
