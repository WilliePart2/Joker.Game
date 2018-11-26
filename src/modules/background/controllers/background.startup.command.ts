import {GameModule} from "../../../game.core/game.classes/game.module";
import {InitBackground} from "../background.notifications";
import {InitBackgroundCommand} from "./init.background.command";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData} from "../../../game.core/common.interfaces/game.data";

export class BackgroundStartupCommand extends GameModule {
    async execute(notification: Notification<IGameInitData>): Promise<any> {
        super.execute(notification);

        this.facade().sendNotification(InitBackground, notification.body);
    }

    registerCommands () {
        this.facade().registerCommand(InitBackground, InitBackgroundCommand);
    }
}
