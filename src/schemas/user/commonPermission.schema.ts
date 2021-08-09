import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class CommonPermission {
    @Prop({ type: Boolean, default: false })
    manage: boolean;

    @Prop({ type: Boolean, default: true })
    create: boolean;

    @Prop({ type: Boolean, default: true })
    read: boolean;

    @Prop({ type: Boolean, default: true })
    update: boolean;

    @Prop({ type: Boolean, default: false })
    delete: boolean;
}
