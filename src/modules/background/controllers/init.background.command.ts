import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData} from "../../../game.core/common.interfaces/game.data";

export class InitBackgroundCommand extends BaseCommand {

    async execute(notification: Notification<IGameInitData>): Promise<any> {
        super.execute(notification);


    }
}
