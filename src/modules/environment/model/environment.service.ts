import {Proxy} from "../../../../PureMVCMulticore/core/pureMVC/Proxy";
import {IGameDimenssions} from "../environment.interfaces";
import {IGameSize} from "../../../game.core/common.interfaces/game.environment";
import { SharedOnGameResize } from '../../../shared.notifications/shared.environment.notification';
import { GameAreaVO } from "./vo/game.area.vo";
import { IGameInitData } from "../../../game.core/common.interfaces/game.data";

export class EnvironmentService extends Proxy {
    static NAME: string = 'EnvironmentService';
    resizeHandler: Function;
    resizeHandlerTimer: number;
    gameContainer: HTMLElement;
    gameAreaVO: GameAreaVO = new GameAreaVO();

    setGameContainer (container: HTMLElement): void {
        this.gameContainer = container;
    }

    getGameDimenssions (gameContainer?: HTMLElement): IGameDimenssions {
        let container: HTMLElement = gameContainer || this.gameContainer;

        return {
            width: container.clientWidth,
            height: container.clientHeight
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

    setGameAreaData(initData: IGameInitData): void {
        this.gameAreaVO.stage = initData.stage;
        this.gameAreaVO.game = initData.app;
    }

    getGameApplication (): PIXI.Application {
        return this.gameAreaVO.game;
    }
}
