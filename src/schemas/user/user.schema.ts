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
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginInformation",
        required: true,
    })
    loginInformation: LoginInformation;

    @Prop({ type: String, required: true })
    firstName: string;

    @Prop({ type: String, required: true })
    lastName: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop({ type: Number, required: true })
    dateOfBirth: number;

    @Prop({ type: Number, required: true })
    monthOfBirth: number;

    @Prop({ type: Number, required: true })
    yearOfBirth: number;

    @Prop({ type: String, required: true, enum: Gender })
    gender: string;

    @Prop({ type: String, required: true, enum: UserStatus })
    userStatus: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "PhoneNumber",
        required: true,
    })
    phoneNumber: PhoneNumber;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true, enum: AccountType })
    accountType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
