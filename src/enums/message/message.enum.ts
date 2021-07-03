export enum CREATE_USER_MESSAGE {
    SUCCESS = "User account has been created successfully",
    FAILED = "Error: Customer not created!",
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
}

export enum ErrorMessage {
    TOKEN_EXPIRED = "Token is expired",
    NOT_FOUND = "Not found",
    WRONG_TOKEN = "Wrong token",
    NUMBER_EXPIRED = "Number is expired",
    WRONG_NUMBER = "Wrong number",
}
