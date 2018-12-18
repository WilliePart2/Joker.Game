import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {GameModule} from "../../../game.core/game.classes/game.module";
import {IGameStartupData} from "../../../game.core/common.interfaces/game.data";
import { SetEnvironmentInitData, WatchGameContainerSize } from "../environment.notifications";
import {WatchGameContainerSizeCommand} from "./watch.game.container.size.command";
import {EnvironmentService} from "../model/environment.service";
import { SharedOnGameResize } from "../../../shared.notifications/shared.environment.notification";
import { ResizeGameRendererCommand } from "./resize.game.renderer.command";
import { SharedOnGameInit } from "../../../shared.notifications/shared.game.notifications";
import { SetInitialDataCommand } from "./set.initial.data.command";
import { InitGameEnvironmentCommand } from "./init.game.environment.command";

export class EnvironmentSturtupCommand extends GameModule {
    async execute(notification: Notification<IGameStartupData>): Promise<any> {
        await super.execute(notification);

        let nBody: IGameStartupData = notification.body,
            container: HTMLElement = nBody.gameContainer;

        await this.facade().sendNotification(WatchGameContainerSize, {container: container});
        await this.registerSharedCommands();
    }

    registerCommands () {
        this.facade().registerCommand(WatchGameContainerSize, WatchGameContainerSizeCommand);
        this.facade().registerCommand(SetEnvironmentInitData, SetInitialDataCommand);
    }

    registerSharedCommands () {
        this.facade().registerCommand(SharedOnGameResize, ResizeGameRendererCommand);
        this.facade().registerCommand(SharedOnGameInit, InitGameEnvironmentCommand);
    }

    registerProxies () {
        this.facade().registerProxy(EnvironmentService.NAME, EnvironmentService);
    }
}
