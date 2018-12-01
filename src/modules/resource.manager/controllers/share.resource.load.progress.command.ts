import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {SharedResourceLoadingProgress} from "../../../shared.notifications/resource.manager.notifications";

export class ShareResourceLoadProgressCommand extends BaseCommand {
    async execute(notification: Notification<number>): Promise<any> {
        this.sendNotificationToAll(SharedResourceLoadingProgress, notification.body);
    }
}
