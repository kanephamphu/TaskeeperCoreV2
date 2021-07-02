import { BcryptSaltRounds } from "enums/user/user.enum";
import * as bcrypt from "bcrypt";

export const comparePasswords = (plainTextPassword, encryptedUserPassword) => {
    return bcrypt.compare(plainTextPassword, encryptedUserPassword);
};

export const hashPassword = (plainTextPassword) => {
    return bcrypt.hash(plainTextPassword, BcryptSaltRounds.PASSWORD);
};
