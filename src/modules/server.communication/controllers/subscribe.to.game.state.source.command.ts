import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { ServerCommunicationService } from "../models/server.communication.service";

export class SubscribeToGameStateSourceCommand extends BaseCommand {
    async execute(notification: Notification<any>): Promise<any> {
        let communicationService: ServerCommunicationService = this.facade().retrieveProxy(ServerCommunicationService.NAME) as ServerCommunicationService;
        communicationService
    }
}
