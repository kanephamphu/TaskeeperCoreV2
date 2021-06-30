import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class LoginInformation {
    @Prop({ type: String })
    facebookToken: string;

    @Prop({ type: String })
    googleToken: string;

    @Prop({ type: String })
    password: string;
}
