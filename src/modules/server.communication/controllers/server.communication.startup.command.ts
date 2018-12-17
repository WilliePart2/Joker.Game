import { GameModule } from "../../../game.core/game.classes/game.module";
import { SignInToGameRoom, SubscribeToGameStateSource } from "../server.communication.notifications";
import { SignInToGameRoomCommand } from "./sign.in.to.game.room.command";
import { ServerCommunicationService } from "../models/server.communication.service";
import { SubscribeToGameStateSourceCommand } from "./subscribe.to.game.state.source.command";

export class ServerCommunicationStartupCommand extends GameModule {
    async execute(notification: any): Promise<any> {
        await super.execute(notification);

        this.facade().sendNotification(SignInToGameRoom);
    }

    registerCommands () {
        this.facade().registerCommand(SignInToGameRoom, SignInToGameRoomCommand);
        this.facade().registerCommand(SubscribeToGameStateSource, SubscribeToGameStateSourceCommand);
    }

    registerProxies () {
        this.facade().registerProxy(ServerCommunicationService.NAME, ServerCommunicationService);
    }
}
