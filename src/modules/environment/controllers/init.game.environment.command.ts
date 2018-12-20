import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IGameInitData } from "../../../game.core/common.interfaces/game.data";
import { EnvironmentService } from "../model/environment.service";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";
import { IGameDimenssions } from "../environment.interfaces";
import { SharedOnGameResize } from "../../../shared.notifications/shared.environment.notification";
import { SetEnvironmentInitData } from "../environment.notifications";

export class InitGameEnvironmentCommand extends BaseCommand {
    async execute(notification: Notification<IGameInitData>): Promise<any> {
        let envService: EnvironmentService = this.facade().retrieveProxy(EnvironmentService.NAME) as EnvironmentService;
        let gameSize: IGameDimenssions = envService.getGameDimenssions();
        await this.facade().sendNotification(SetEnvironmentInitData, notification.body);
        // await this.sendNotificationToAll(SharedOnGameResize, {
        //     gameWidth: gameSize.width,
        //     gameHeight: gameSize.height
        // })
    }
}
