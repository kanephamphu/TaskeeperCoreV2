import { User } from "schemas/user/user.schema";
import { Prop, Schema } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { CandidateStatus } from "enums/post/post.enum";

@Schema()
export class Candidate {
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: "User" }])
    candidate: User;

    @Prop({ type: String, enum: CandidateStatus })
    status: CandidateStatus;

    @Prop({ type: Date, default: Date.now() })
    appliedTime: Date;

    @Prop({ type: Date, default: Date.now() })
    approvedTime: Date;

    @Prop({ type: Date, default: Date.now() })
    chargedTime: Date;

    @Prop({ type: Date, default: Date.now() })
    canceledTime: Date;

    @Prop({ type: String })
    message: string;
}
