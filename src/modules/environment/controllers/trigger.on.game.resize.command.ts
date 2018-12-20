import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { EnvironmentService } from "../model/environment.service";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";
import { SharedOnGameResize } from "../../../shared.notifications/shared.environment.notification";
import { IGameDimenssions } from "../environment.interfaces";

export class TriggerOnGameResizeCommand extends BaseCommand {
    async execute(notification: Notification<any>): Promise<any> {
        let envService: EnvironmentService = this.facade().retrieveProxy(EnvironmentService.NAME) as EnvironmentService;
        let { width: gameWidth, height: gameHeight }: IGameDimenssions = envService.getGameDimenssions();
        await this.sendNotificationToAll(SharedOnGameResize, {
            gameWidth,
            gameHeight
        } as IGameSize);
    }
}
