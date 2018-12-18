import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";

export class ShowGenericErrorMessageCommand extends BaseCommand {
    async execute(notification: Notification<any>): Promise<any> {
        super.execute(notification);

        console.error('GENERIC_ERROR');
    }
}
