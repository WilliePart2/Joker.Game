import {BaseCommand} from "../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {IGameInitData, IInitGameAreaData} from "../../game.core/common.interfaces/game.data";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {PerformMountingGame} from "../game.main.module.notifications";

export class MountGameRendererCommand extends BaseCommand {
    async execute(notification: Notification<IGameInitData>): Promise<any> {
        let initData: IGameInitData = notification.body,
            gameContainer = document.getElementById(initData.containerId),
            dataForMounting: IInitGameAreaData = {
                containerWidth: gameContainer.clientWidth,
                containerHeight: gameContainer.clientHeight,
                gameContainer: gameContainer
            };

        this.facade().sendNotification(PerformMountingGame, dataForMounting);
    }
}