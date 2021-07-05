import { BcryptSaltRounds } from "enums/user/user.enum";
import * as bcrypt from "bcrypt";

export const comparePasswords = (
    plainTextPassword,
    encryptedUserPassword
): Promise<boolean> => {
    return bcrypt.compare(plainTextPassword, encryptedUserPassword);
};

export const hashPassword = (plainTextPassword): Promise<string> => {
    return bcrypt.hash(plainTextPassword, BcryptSaltRounds.PASSWORD);
};
