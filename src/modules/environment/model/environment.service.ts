import {Proxy} from "../../../../PureMVCMulticore/core/pureMVC/Proxy";
import {IGameDimenssions} from "../environment.interfaces";
import {IGameSize} from "../../../game.core/common.interfaces/game.environment";
import { SharedOnGameResize } from '../../../shared.notifications/shared.environment.notification';

export class EnvironmentService extends Proxy {
    static NAME: string = 'EnvironmentService';
    resizeHandler: Function;
    resizeHandlerTimer: number;
    getGameDimenssions (gameContainer: HTMLElement): IGameDimenssions {
        return {
            width: gameContainer.clientWidth,
            height: gameContainer.clientHeight
        };
    }

    listenResizeEvent (container: Window, gameContainer: HTMLElement): void {
        this.resizeHandler = () => {
            clearTimeout(this.resizeHandlerTimer);

            this.resizeHandlerTimer = setTimeout(() => {
                let {width, height}: IGameDimenssions = this.getGameDimenssions(gameContainer);
                let gameSize: IGameSize = {
                    gameWidth: width,
                    gameHeight: height
                };
                this.sendNotificationToAll(SharedOnGameResize, gameSize);
            }, 100);
        };

        container.addEventListener('resize', this.resizeHandler as EventListener, false);
    }

    removeResizeListener (container: Window): void {
        container.removeEventListener('resize', this.resizeHandler as EventListener);
    }
}
