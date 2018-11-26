import {BaseCommand} from "../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {IGameInitData, IGameStartupData, IInitGameAreaData} from "../../game.core/common.interfaces/game.data";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {PerformMountingGame} from "../game.main.module.notifications";
import {GameAreaMediator} from "../view/game.area.mediator";

export class MountGameRendererCommand extends BaseCommand {
    async execute(notification: Notification<IGameStartupData>): Promise<any> {
        let initData: IGameStartupData = notification.body,
            // gameContainer = document.getElementById(initData.containerId),
            gameContainer = initData.gameContainer,
            dataForMounting: IInitGameAreaData = {
                containerWidth: gameContainer.clientWidth,
                containerHeight: gameContainer.clientHeight,
                gameContainer: gameContainer
            };

        // let rendererMediator: GameAreaMediator = this.facade().retrieveMediator(GameAreaMediator.NAME) as GameAreaMediator;
        // rendererMediator.createGameRenderer(dataForMounting);
        this.facade().sendNotification(PerformMountingGame, dataForMounting);
    }
}