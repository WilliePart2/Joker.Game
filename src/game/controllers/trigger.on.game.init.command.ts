import { BaseCommand } from "../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { SharedOnGameInit } from "../../shared.notifications/shared.game.notifications";
import { IGameInitData } from "../../game.core/common.interfaces/game.data";

export class TriggerOnGameInitCommand extends BaseCommand {
    async execute(notification: Notification<IGameInitData>): Promise<any> {
        await this.sendNotificationToAll(SharedOnGameInit, notification.body);
    }
}
