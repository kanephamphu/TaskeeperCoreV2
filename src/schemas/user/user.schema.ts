import { Tag } from "schemas/tag/tag.schema";
import { LanguageCode } from "enums/codetable/language.enum";
import { AccountType } from "enums/user/user.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Gender, AccountStatus } from "enums/user/user.enum";
import { LoginInformation } from "schemas/user/loginInformation.schema";
import { PhoneNumber } from "schemas/user/phoneNumber.schema";
import { VerifyInformation } from "schemas/user/verifyInformation.schema";
import { Permissions } from "schemas/user/permission.schema";
import { Schema as MongooseSchema } from "mongoose";

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
        enum: AccountStatus,
        default: AccountStatus.INACTIVE,
    })
    accountStatus: string;

    @Prop({
        required: true,
    })
    phoneNumber: PhoneNumber;

    @Prop({ type: String })
    avatar: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({
        type: String,
        required: true,
        enum: AccountType,
        default: AccountType.NORMAL_USER,
    })
    accountType: string;

    @Prop()
    verifyInformation: VerifyInformation;

    @Prop({ type: String, enum: LanguageCode })
    languageCode: string;

    @Prop({ require: true, default: new Permissions() })
    permissions: Permissions;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: "Tag" }])
    tags: Tag[];
}

export const UserSchema = SchemaFactory.createForClass(User);
