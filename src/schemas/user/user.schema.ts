import { AccountType } from "enums/user/user.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Gender, UserStatus } from "enums/user/user.enum";
import * as mongoose from "mongoose";
import { LoginInformation } from "schemas/user/loginInformation.schema";
import { PhoneNumber } from "schemas/user/phoneNumber.schema";

@Schema()
export class User extends Document {
    @Prop({
        required: true,
    })
    loginInformation: LoginInformation;

    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: true })
    lastName: string;

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop({ type: Number, required: true })
    dayOfBirth: number;

    @Prop({ type: Number, required: true })
    monthOfBirth: number;

    @Prop({ type: Number, required: true })
    yearOfBirth: number;

    @Prop({ type: String, required: true, enum: Gender })
    gender: string;

    @Prop({
        type: String,
        required: true,
        enum: UserStatus,
        default: UserStatus.INACTIVE,
    })
    userStatus: string;

    @Prop({
        required: true,
    })
    phoneNumber: PhoneNumber;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({
        type: String,
        required: true,
        enum: AccountType,
        default: AccountType.NORMAL_USER,
    })
    accountType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
