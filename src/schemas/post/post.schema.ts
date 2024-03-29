import { User } from "schemas/user/user.schema";
import { JobType } from "enums/post/post.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Candidate } from "schemas/post/canidate.schema";

@Schema()
export class Post extends Document {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String })
    requirement: string;

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now() })
    updatedAt: Date;

    @Prop({ type: String, enum: JobType })
    jobType: JobType;

    @Prop({ type: Date })
    expiredDate: Date;

    @Prop({ type: Boolean })
    isClosed: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
    author: User;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: "User" }])
    owner: User[];

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: "User" }])
    editor: User[];

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: "User" }])
    spectator: User[];

    @Prop([{ type: String }])
    tags: string[];

    @Prop([{ type: String }])
    skills: string[];

    @Prop([{ type: String }])
    industries: string[];

    @Prop([{ type: String }])
    positions: string[];

    @Prop([{ type: String }])
    images: string[];

    @Prop([{ type: Boolean }])
    disabled: boolean;

    @Prop([{}])
    candidates: Candidate[];

    @Prop({ type: Number, default: 0 })
    impressions: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
