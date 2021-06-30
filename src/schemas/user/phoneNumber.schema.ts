import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class PhoneNumber extends Document {
    @Prop({ type: String, required: true })
    ISD_CodeId: string;

    @Prop({ type: String, required: true })
    phoneNumber: string;
}
