import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { ServerCommunicationService } from "../models/server.communication.service";
import { ISignInToGameRoomData } from "../interfaces/server.communication.response.interfaces";
import { GameFlowModule } from "../../../module.names";
import { SubscribeToGameStateSource } from "../../game.flow/game.flow.notifications";

export class SignInToGameRoomCommand extends BaseCommand {

    async execute(notification: Notification<any>): Promise<any> {
        let communicationService: ServerCommunicationService = this.facade().retrieveProxy(ServerCommunicationService.NAME) as ServerCommunicationService;
        let gameRoomData: ISignInToGameRoomData = await communicationService.signInToGameRoom();
        this.facade().sendNotification(SubscribeToGameStateSource);
        // this.sendNotficationToModule(GameFlowModule, SubscribeToGameStateSource, gameRoomData);
    }
}
