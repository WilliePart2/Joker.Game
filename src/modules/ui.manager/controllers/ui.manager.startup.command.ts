import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { UIUtilsService } from "../models/ui.utils.service";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IGameInitData, IGameStartupData } from "../../../game.core/common.interfaces/game.data";
import { GameModule } from "../../../game.core/game.classes/game.module";
import { SharedAddClassToElement, SharedRemoveClassFromElement } from "../../../shared.notifications/shared.ui.manager.notifications";
import { AddUIClassCommand } from "./add.ui.class.command";
import { RemoveUIClassCommand } from "./remove.ui.class.command";
import { UIManipulation } from "../models/ui.manipulation.service";

export class UIManagerStartupCommand extends GameModule {
    async execute(notification: Notification<IGameStartupData>) {
        super.execute(notification);
        this.registerSharedCommands();
        this.initSpecialServices(notification.body);
    }

    registerSharedCommands () {
        this.facade().registerCommand(SharedAddClassToElement, AddUIClassCommand);
        this.facade().registerCommand(SharedRemoveClassFromElement, RemoveUIClassCommand);
    }

    registerProxies () {
        this.facade().registerProxy(UIUtilsService.NAME, UIUtilsService);
    }

    initSpecialServices (initData: IGameStartupData): void {
        let uiManager: UIManipulation = UIManipulation.getInstance();
        uiManager.initManager(initData);
    }
}
