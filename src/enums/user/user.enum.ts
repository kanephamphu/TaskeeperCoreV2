export enum Gender {
    MALE = "male",
    FEMALE = "female",
    UNDEFINED = "undefined",
}

export enum AccountStatus {
    ACTIVE = "active",
    INACTIVE = "inActive",
    SUSPENDED = "suspended",
    FIRST_TIME = "firstTime",
}

export enum AccountType {
    ADMIN = "admin",
    NORMAL_USER = "normalUser",
    PREMIUM_USER = "premiumUser",
}

export enum TokenType {
    REGISTER = "register",
    SEND_MONEY = "sendMoney",
    RESET_PASSWORD = "resetPassword",
}

export enum BcryptSaltRounds {
    PASSWORD = 10,
}
