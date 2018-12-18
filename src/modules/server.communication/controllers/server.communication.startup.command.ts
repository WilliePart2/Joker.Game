import { GameModule } from "../../../game.core/game.classes/game.module";
import { SignInToGameRoomCommand } from "./sign.in.to.game.room.command";
import { ServerCommunicationService } from "../models/server.communication.service";
import { SubscribeToGameStateSourceCommand } from "./subscribe.to.game.state.source.command";
import {
    SharedAuthenticateUser,
    SharedSignInToGameRoom,
    SharedSubscribeToGameStateSource
} from "../../../shared.notifications/shared.server.communication.notifications";
import { AuthenticateUserCommand } from "./authenticate.user.command";

export class ServerCommunicationStartupCommand extends GameModule {
    async execute(notification: any): Promise<any> {
        await super.execute(notification);

        // this.facade().sendNotification(SharedSignInToGameRoom);
    }

    registerCommands () {
        this.facade().registerCommand(SharedSignInToGameRoom, SignInToGameRoomCommand);
        this.facade().registerCommand(SharedSubscribeToGameStateSource, SubscribeToGameStateSourceCommand);
        this.facade().registerCommand(SharedAuthenticateUser, AuthenticateUserCommand);
    }

    registerProxies () {
        this.facade().registerProxy(ServerCommunicationService.NAME, ServerCommunicationService);
    }
}
