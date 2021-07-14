import { TagValue } from "schemas/tag/tagValue.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Tag extends Document {
    @Prop({ type: TagValue, required: true })
    value: TagValue;

    @Prop({ type: Number, required: true, default: 0 })
    usingTimes: number;

    @Prop({ type: Date, required: true, default: Date.now() })
    createdAt: Date;

    @Prop({ type: Date, required: true, default: Date.now() })
    modifiedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
