import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {AssetsManager} from "../model/assets.manager";

export class GetAssetByNameCommand extends BaseCommand {
    async execute(notification: Notification<string>): Promise<any> {
        let assetsManager: AssetsManager = this.facade().retrieveProxy(AssetsManager.NAME) as AssetsManager,
            textureName: string = notification.body;

        return assetsManager.getImage(textureName);
    }
}
