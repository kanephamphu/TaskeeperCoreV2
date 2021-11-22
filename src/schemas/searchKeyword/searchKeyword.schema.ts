import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class SearchKeyword extends Document {
    @Prop({ type: String, required: true })
    queryString: string;

    @Prop({ type: Number, default: 0 })
    impressions: number;

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;
}

export const SearchKeywordSchema = SchemaFactory.createForClass(SearchKeyword);
