import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IResourceConfig} from "../resource.loader.interfaces";
import {AssetsManager} from "../model/assets.manager";

export class LoadAssetsCommand extends BaseCommand {
    async execute(notification: Notification<IResourceConfig>): Promise<any> {
        let resourceMap: IResourceConfig = notification.body,
            assetsManager: AssetsManager = this.facade().retrieveProxy(AssetsManager.NAME) as AssetsManager;

        assetsManager.loadResources(resourceMap.resources);
    }
}
