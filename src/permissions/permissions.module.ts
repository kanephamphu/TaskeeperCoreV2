import { NestjsQueryMongooseModule } from "@nestjs-query/query-mongoose";
import { Module } from "@nestjs/common";
import { PermissionsService } from "permissions/services/permissions.service";
import { User, UserSchema } from "schemas/user/user.schema";

@Module({
    imports: [
        NestjsQueryMongooseModule.forFeature([
            { document: User, name: User.name, schema: UserSchema },
        ]),
    ],
    providers: [PermissionsService],
    exports: [PermissionsService],
})
export class PermissionsModule {}
