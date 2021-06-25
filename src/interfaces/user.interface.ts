import { Document } from "mongoose";

export interface User extends Document {
    readonly loginString: string;
    readonly password: number;
}
