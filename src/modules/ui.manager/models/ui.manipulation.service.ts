/**
 * Service for manipulation with ui position, size etc.
 * It expose high level interface and work with underling game modules such as compiler and ui manager.
 * Singleton. Store only global game objects and configurations
 */
import { UiSizeManager } from "./ui.size.manager";
import { IEltDimensions, IUIManager } from "../ui.manager.interfaces";
import { IGameInitData, IGameStartupData } from "../../../game.core/common.interfaces/game.data";
import { UIPositionManager } from "./ui.position.manager";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";
import { UIPosition } from "../ui.manager.types";

export class UIManipulation implements IUIManager{
    static _instance: UIManipulation;
    private _sizeManager: UiSizeManager;
    private _positionManager: UIPositionManager;

    static getInstance (): UIManipulation {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }


    initManager (initData: IGameStartupData): void {
        this._sizeManager = UiSizeManager.getInstance();
        this._sizeManager.__setGameStage(initData.gameContainer);

        this._positionManager = UIPositionManager.getInstance();
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

    position(side: "bottom" | "top" | "left" | "right" | "center", gap?: number): IUIManager;
    position(element: PIXI.Container, side: "bottom" | "top" | "left" | "right" | "center", gap?: number): IUIManager;
    position(element: "bottom" | "top" | "left" | "right" | "center" | PIXI.Container, side?: number | "bottom" | "top" | "left" | "right" | "center", gap?: number): IUIManager {
        let gameSize: IGameSize = this._sizeManager.getGameSize();
        let pluralPosition: UIPosition[] = (side as string).split(' ') as UIPosition[];
        if (pluralPosition.length > 1) {
            pluralPosition.forEach((position: UIPosition) => this.position(element as PIXI.Container, position as any, gap));
            return this;
        }
        switch (side) {
            case 'bottom':
                this._applyPositionBottom(element as PIXI.Container, gameSize, gap);
                break;
            case 'top':
                this._applyPositionTop(element as PIXI.Container, gameSize, gap);
                break;
            case 'right':
                this._applyPositionRight(element as PIXI.Container, gameSize, gap);
                break;
            case 'left':
                this._applyPositionLeft(element as PIXI.Container, gameSize, gap);
                break;
            case 'center':
                this._applyPositionCenter(element as PIXI.Container, gameSize);
                break;
            case 'xCenter':
                this._alignByXAxis(element as PIXI.Container, gameSize);
                break;
            case 'yCenter':
                this._alignByYAxis(element as PIXI.Container, gameSize);
                break;
        }

        return this;
    }

    private _applyPositionBottom (element: PIXI.Container, gameSize: IGameSize, gap?: number): void {
        this._positionManager.dispozeElement(element, 'bottom', gameSize, gap);
    }

    private _applyPositionTop (element: PIXI.Container, gameSize: IGameSize, gap?: number): void {
        this._positionManager.dispozeElement(element, 'top', gameSize, gap)
    }

    private _applyPositionLeft (element: PIXI.Container, gameSize: IGameSize, gap?: number): void {
        this._positionManager.dispozeElement(element, 'left', gameSize, gap);
    }

    private _applyPositionRight (element: PIXI.Container, gameSize: IGameSize, gap?: number): void {
        this._positionManager.dispozeElement(element, 'right', gameSize, gap);
    }

    private _applyPositionCenter (element: PIXI.Container, gameSize: IGameSize): void {
        this._positionManager.dispozeElement(element, 'center', gameSize);
    }

    private _alignByXAxis (element: PIXI.Container, gameSize: IGameSize): void {
        this._positionManager.dispozeElement(element, 'xCenter', gameSize);
    }

    private _alignByYAxis (element: PIXI.Container, gameSize: IGameSize): void {
        this._positionManager.dispozeElement(element, 'yCenter', gameSize);
    }

    zIndex(zIndex: number): IUIManager;
    zIndex(element: PIXI.Container, zIndex: number): IUIManager;
    zIndex(element: number | PIXI.Container, zIndex?: number): IUIManager {
        this._positionManager.applyElementZIndex(element as PIXI.Container, zIndex);
        return this;
    }
}
