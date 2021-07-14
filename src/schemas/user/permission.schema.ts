import { Prop, Schema } from "@nestjs/mongoose";
import { CommonPermission } from "schemas/user/commonPermission.schema";

@Schema()
export class Permissions {
    @Prop({ require: true, default: new CommonPermission() })
    post: CommonPermission;

    @Prop({ require: true, default: new CommonPermission() })
    user: CommonPermission;

    @Prop({ require: true, default: new CommonPermission() })
    moneyTransaction: CommonPermission;
}
