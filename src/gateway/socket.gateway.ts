import { GateWayEvent } from "enums/gateway/gateway.enum";
import SearchTagByStringDto from "dtos/tags/searchTagByString.dto";
import { TagsService } from "tags/services/tags.service";
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger, UsePipes, ValidationPipe } from "@nestjs/common";
import { Socket, Server } from "socket.io";

@WebSocketGateway()
export class SocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private tagsService: TagsService) {}

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger("AppGateway");

    @SubscribeMessage("msgToServer")
    handleMessage(client: Socket, payload: string): void {
        this.server.emit("msgToClient", payload);
    }

    @UsePipes(new ValidationPipe())
    @SubscribeMessage("clientSearchTags")
    async handleSearchTags(
        client: Socket,
        searchTagByStringDto: SearchTagByStringDto
    ) {
        const tags = await this.tagsService.searchTagsByString(
            searchTagByStringDto
        );

        return { event: GateWayEvent.SERVER_SEARCH_TAGS, data: tags };
    }

    afterInit(server: Server) {
        this.logger.log("Init");
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
