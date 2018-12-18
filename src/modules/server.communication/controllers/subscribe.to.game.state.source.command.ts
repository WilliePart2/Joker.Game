import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { ServerCommunicationService } from "../models/server.communication.service";
import { IGameStateSubscriptionRequest } from "../interfaces/server.communications.request.interfaces";

export class SubscribeToGameStateSourceCommand extends BaseCommand {
    async execute(notification: Notification<IGameStateSubscriptionRequest>): Promise<boolean> {
        let communicationService: ServerCommunicationService = this.facade().retrieveProxy(ServerCommunicationService.NAME) as ServerCommunicationService;
        try {
            await communicationService.subscribeToGameStateUpdates(notification.body);
            return true;
        } catch (e) {
            return false;
        }
    }
}
