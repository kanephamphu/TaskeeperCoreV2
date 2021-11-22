import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeletePostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    _id: string;
}
