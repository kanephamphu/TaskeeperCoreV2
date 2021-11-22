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

export enum VerificationType {
    REGISTER = "register",
    SEND_MONEY = "sendMoney",
    FORGOT_PASSWORD = "forgotPassword",
}

export enum BcryptSaltRounds {
    PASSWORD = 10,
}

export enum VerifyNumberRange {
    MIN = 1000,
    MAX = 9999,
}
