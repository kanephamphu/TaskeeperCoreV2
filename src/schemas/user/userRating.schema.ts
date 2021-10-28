import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Schema as MongooseSchema } from "mongoose";

@Schema()
export class UserRating extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, unique: true })
    user: string;

    @Prop({ type: Number, required: true })
    point: number;

    @Prop({ type: String, required: true })
    message: string;

    @Prop({ type: Date, required: true })
    createdAt: Date;

    @Prop({ type: Date, required: true })
    updatedAt: Date;
}
