import { TagsModule } from "tags/tags.module";
import { SocketGateway } from "gateway/socket.gateway";
import { Module } from "@nestjs/common";

@Module({
    imports: [TagsModule],
    providers: [SocketGateway],
})
export class GatewayModule {}
