import {GameModule} from "../../../game.core/game.classes/game.module";
import {IGameStartupData} from "../../../game.core/common.interfaces/game.data";
import {LoadAssets, LoadManifest, ShareResourceLoadProgress} from "../resource.loader.notifications";
import {LoadAssetsManifestCommand} from "./load.assets.manifest.command";
import {ILoadManifestData, IResourceConfig} from "../resource.loader.interfaces";
import {AssetsManager} from "../model/assets.manager";
import {LoadAssetsCommand} from "./load.assets.command";
import {TPlatform} from "../../../game.core/common.constants/platforms";
import {ShareResourceLoadProgressCommand} from "./share.resource.load.progress.command";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";

export class ResourceManagerStartupCommand extends GameModule {
    async execute(notification: Notification<IGameStartupData>): Promise<any> {
        this.registerCommands();

        let startupData: IGameStartupData = notification.body,
            loadManifestData: ILoadManifestData = {
                pathToManifest: startupData.pathToManifest,
                assetsManifest: startupData.assetsManifest
            },
            assetsManifest: IResourceConfig = await this.facade().sendNotification(LoadManifest, loadManifestData);

        this.registerProxies({...assetsManifest, assetsPath: startupData.routeForLoadingAssets} as IResourceConfig);
        let assetsManager: AssetsManager = this.facade().retrieveProxy(AssetsManager.NAME) as AssetsManager;
        assetsManager.setPlatform(TPlatform.All);

        await this.facade().sendNotification(LoadAssets, assetsManifest);
    }

    registerCommands() {
        this.facade().registerCommand(LoadManifest, LoadAssetsManifestCommand);
        this.facade().registerCommand(LoadAssets, LoadAssetsCommand);
        this.facade().registerCommand(ShareResourceLoadProgress, ShareResourceLoadProgressCommand);
    }

    registerProxies(manifest: IResourceConfig) {
        this.facade().registerProxy(AssetsManager.NAME, AssetsManager, manifest);
    }
}