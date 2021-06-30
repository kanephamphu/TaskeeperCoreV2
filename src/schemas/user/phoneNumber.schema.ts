@Schema()
export class PhoneNumber {
    @Prop({ type: String, required: true })
    ISD_CodeId: string;

    @Prop({ type: String, required: true })
    phoneNumber: string;
}
