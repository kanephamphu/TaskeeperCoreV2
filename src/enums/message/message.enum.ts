export enum CREATE_USER_MESSAGE {
    SUCCESS = "User account has been created successfully",
    FAILED = "Error: User not created!",
}

export enum SEARCH_TAGS {
    SUCCESS = "Get successfully",
    NOT_FOUND = "Error: No data found",
}

export enum USER_LOGIN_MESSAGE {
    SUCCESS = "User account has been logon successfully",
    FAILED = "Error: User not found!",
}

export enum CODE_TABLE_MESSAGE {
    SUCCESS = "Get code table successfully",
    FAILED = "Error: Not found!",
}

export enum COMMON_MESSAGE {
    BAD_REQUEST = "Error: Request not resolved",
    SUCCESS = "Handle successfully",
    FAILED = "Error: Not found!",
    USER_NOTFOUND = "Error: User not found!",
    INTERNAL_SERVER_ERROR = "Error: Internal error!",
    UNAUTHORIZED = "Error: Unauthorized",
}

export enum ERROR_MESSAGE {
    TOKEN_EXPIRED = "Token is expired",
    NOT_FOUND = "Not found",
    WRONG_TOKEN = "Wrong token",
    NUMBER_EXPIRED = "Number is expired",
    WRONG_NUMBER = "Wrong number",
    NO_PERMISSION = "No permission to access this object",
}
