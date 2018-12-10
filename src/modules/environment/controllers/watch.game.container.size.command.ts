import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameDimenssions, IWatchGameSizeStatement} from "../environment.interfaces";
import {SharedOnGameResize} from "../../../shared.notifications/shared.environment.notification";
import {IGameSize} from "../../../game.core/common.interfaces/game.environment";
import {EnvironmentService} from "../model/environment.service";

export class WatchGameContainerSizeCommand extends BaseCommand {

    async execute(notification: Notification<IWatchGameSizeStatement>): Promise<any> {
        let nBody: IWatchGameSizeStatement = notification.body,
            container: HTMLElement = nBody.container,
            mainWrapper: Window = window,
            environmentService: EnvironmentService = this.facade().retrieveProxy(EnvironmentService.NAME) as EnvironmentService;

        environmentService.listenResizeEvent(mainWrapper, container, (gameSize: IGameSize) => {
            this.sendNotificationToAll(SharedOnGameResize, gameSize);
        });
    }
}
