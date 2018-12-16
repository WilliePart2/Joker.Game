/**
 * Service for manipulation with ui position size etc.
 * It expose high level interface and work with underling game modules such as compiler and ui manager.
 * Singleton. Store only global game objects and configurations
 * Base class
 */
import { UiSizeManager } from "./ui.size.manager";
import { IEltDimensions, IUIManager } from "../ui.manager.interfaces";
import { IGameInitData, IGameStartupData } from "../../../game.core/common.interfaces/game.data";

export class UIManipulation implements IUIManager{
    static _instance: UIManipulation;
    private _sizeManager: UiSizeManager;

    static getInstance (): UIManipulation {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }


    initManager (initData: IGameStartupData): void {
        this._sizeManager = UiSizeManager.getInstance();
        this._sizeManager.__setGameStage(initData.gameContainer);
    }

    /**
     * Manage element size
     * We could specify size in two variation: percent and raw value(number)
     * For scale element sides equal we need to specify single value. (Example: size("83%"))
     * @param {{
     *  width: number | string,
     *  height: number | string
     *  } | string} size
     * @param {boolean} applyMaxScale
     */
    size(size: IEltDimensions<string | number> | string, applyMaxScale?: boolean): IUIManager;
    size(element: PIXI.Container, size: IEltDimensions<string | number> | string, applyMaxScale?: boolean): IUIManager;
    size(element: IEltDimensions<string | number> | string | PIXI.Container, size?: boolean | IEltDimensions<string | number> | string, applyMaxScale?: boolean): IUIManager {
        this._sizeManager.manageSize(
                element as PIXI.Container,
                size as IEltDimensions<string | number>,
                applyMaxScale as boolean
            );

            return this;
    }
}
