import { VerificationType } from "enums/user/user.enum";
import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class VerifyInformation extends Document {
    @Prop({ type: String, required: true })
    token: string;

    @Prop({ type: Number, required: true })
    verifyNumber: number;

    @Prop({ type: Date, required: true })
    tokenTimeToLive: Date;

    @Prop({ type: Date, required: true })
    numberTimeToLive: Date;

    @Prop({ type: String, required: true, enum: VerificationType })
    verificationType: string;

    @Prop({ type: Boolean, required: true, default: false })
    isUsed: boolean;
}
