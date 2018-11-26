import {Mediator} from "../../../PureMVCMulticore/core/pureMVC/mediator/Mediator";
import {IInitGameAreaData} from "../../game.core/common.interfaces/game.data";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {PerformMountingGame} from "../game.main.module.notifications";
import * as PIXI from 'pixi.js'

export class GameAreaMediator extends Mediator {
    static NAME = 'GAME_AREA_MEDIATOR';

    createGameRenderer (initRendererData: IInitGameAreaData): PIXI.Container {
            let game: PIXI.Application = new PIXI.Application({
                width: initRendererData.containerWidth,
                height: initRendererData.containerHeight,
                resolution: 1,
                antialias: true
            });

            let gameView = game.renderer.view;
            gameView.style.backgroundColor = '0x000000';

            initRendererData.gameContainer.appendChild(game.view);

            return game.stage;
    }


    listNotificationInterests(): Notification<any>[] {
        return [
            PerformMountingGame
        ];
    }


    async handleNotification(notification: Notification<any>): Promise<any> {
        switch (notification.name) {
            case PerformMountingGame.name:
                return this.createGameRenderer(notification.body);
                break;
        }
    }
}
