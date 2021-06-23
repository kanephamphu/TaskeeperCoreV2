import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ type: String })
    loginString: string;

    @ApiProperty({ type: String })
    password: string;
}
