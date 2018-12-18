import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { ServerCommunicationService } from "../models/server.communication.service";
import { ICommonResponse, IUserObject } from "../interfaces/server.communication.response.interfaces";
import { getResponsePayload } from "../utils/data.handling";

export class AuthenticateUserCommand extends BaseCommand {
    async execute(notification: Notification<any>): Promise<any> {
        let serverCommunicationService: ServerCommunicationService = this.facade().retrieveProxy(ServerCommunicationService.NAME) as ServerCommunicationService;
        let authUserObject: IUserObject = await serverCommunicationService.authenticateUser();
        return authUserObject;
    }
}
