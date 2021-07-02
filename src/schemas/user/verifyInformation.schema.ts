import { VerificationType } from "enums/user/user.enum";
import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class VerifyInformation extends Document {
    @Prop({ type: String, required: true })
    token: string;

    @Prop({ type: Number, required: true })
    verifyNumber: string;

    @Prop({ type: Date, required: true })
    timeToLive: Date;

    @Prop({ type: String, required: true, enum: VerificationType })
    verificationType: string;

    @Prop({ type: Boolean, required: true, default: false })
    isUsed: boolean;
}
