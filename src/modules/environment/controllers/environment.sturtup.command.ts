import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {GameModule} from "../../../game.core/game.classes/game.module";
import {IGameStartupData} from "../../../game.core/common.interfaces/game.data";
import {WatchGameContainerSize} from "../environment.notifications";
import {WatchGameContainerSizeCommand} from "./watch.game.container.size.command";
import {EnvironmentService} from "../model/environment.service";

export class EnvironmentSturtupCommand extends GameModule {
    async execute(notification: Notification<IGameStartupData>): Promise<any> {
        super.execute(notification);

        let nBody: IGameStartupData = notification.body,
            container: HTMLElement = nBody.gameContainer;

        this.facade().sendNotification(WatchGameContainerSize, {container: container})
            .then()
    }

    registerCommands () {
        this.facade().registerCommand(WatchGameContainerSize, WatchGameContainerSizeCommand);
    }

    registerProxies () {
        this.facade().registerProxy(EnvironmentService.NAME, EnvironmentService);
    }
}
