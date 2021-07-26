import { SocketGateway } from "gateway/socket.gateway";
import { Module } from "@nestjs/common";

@Module({
    providers: [SocketGateway],
})
export class GatewayModule {}
