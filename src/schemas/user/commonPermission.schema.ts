import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class CommonPermission {
    @Prop({ type: Boolean, default: false })
    manage: boolean;

    @Prop({ type: Boolean })
    create: boolean;

    @Prop({ type: Boolean })
    read: boolean;

    @Prop({ type: Boolean })
    update: boolean;

    @Prop({ type: Boolean })
    delete: boolean;
}
