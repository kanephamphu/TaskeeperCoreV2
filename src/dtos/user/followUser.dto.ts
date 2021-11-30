import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class FollowUserDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    userId: string;
}
