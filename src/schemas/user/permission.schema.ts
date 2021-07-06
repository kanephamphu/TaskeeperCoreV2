import { Prop, Schema } from "@nestjs/mongoose";
import { CommonPermission } from "schemas/user/commonPermission.schema";

@Schema()
export class Permission {
    @Prop({ type: CommonPermission })
    post: CommonPermission;

    @Prop({ type: CommonPermission })
    user: CommonPermission;

    @Prop({ type: CommonPermission })
    moneyTransaction: CommonPermission;
}
