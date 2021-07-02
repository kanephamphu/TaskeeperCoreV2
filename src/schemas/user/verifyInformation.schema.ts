import { TokenType } from "enums/user/user.enum";
import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class VerifyInformation extends Document {
    @Prop({ type: String, required: true })
    token: string;

    @Prop({ type: String, required: true })
    verifyNumber: string;

    @Prop({ type: Date, required: true })
    timeToLive: Date;

    @Prop({ type: String, required: true, enum: TokenType })
    tokenType: string;
}
