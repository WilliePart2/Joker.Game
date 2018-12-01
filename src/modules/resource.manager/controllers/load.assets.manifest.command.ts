import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {ILoadManifestData, IResourceConfig} from "../resource.loader.interfaces";
import {ResourceManager} from "../model/resource.manager";

export  class LoadAssetsManifestCommand extends BaseCommand {
    async execute(notification: Notification<ILoadManifestData>): Promise<IResourceConfig | null> {
        let manifestData: ILoadManifestData = notification.body;

        return ResourceManager.loadManifest(manifestData.pathToManifest, manifestData.assetsManifest);
    }
}
