import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {
    ISignInToGameRoomData,
    IUserObject
} from "../../server.communication/interfaces/server.communication.response.interfaces";
import { ServerCommunicationModule } from "../../../module.names";
import {
    SharedAuthenticateUser,
    SharedSignInToGameRoom, SharedSubscribeToGameStateSource
} from "../../../shared.notifications/shared.server.communication.notifications";

/**
 * this command responsive for all kind of user sign in to game
 * area of responsibility:
 * - regular game flow (start with new game)
 * - disconnection flow (connect to early played game)
 */
export class EnterToGameCommand extends BaseCommand {
    async execute(notification: Notification<any>): Promise<any> {
        let authUserObject: IUserObject = await this.sendNotficationToModule(ServerCommunicationModule, SharedAuthenticateUser);
        let gameRoomData: ISignInToGameRoomData = await this.sendNotficationToModule(ServerCommunicationModule, SharedSignInToGameRoom);
        await this.sendNotficationToModule(ServerCommunicationModule, SharedSubscribeToGameStateSource, {
            userId: authUserObject.id,
            tableId: gameRoomData.gameRoomId
        });
    }
}
