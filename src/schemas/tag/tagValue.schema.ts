import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class TagValue extends Document {
    @Prop({ type: String })
    vi_VI: string;

    @Prop({ type: String })
    en_US: string;
}
