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
    // size(size: IEltDimensions<string | number>, applyMaxScale?: boolean): IUIManager;
    // size(element: PIXI.Container, size: IEltDimensions<string | number>, applyMaxScale?: boolean): IUIManager;
    // size(element: IEltDimensions<string | number> | PIXI.Container, size?: boolean | IEltDimensions<string | number>, applyMaxScale?: boolean): IUIManager {
    //     this._sizeManager.manageSize(
    //         element as PIXI.Container,
    //         size as IEltDimensions<string | number>,
    //         applyMaxScale as boolean
    //     );
    //
    //     return this;
    // }

    // size(size: IEltDimensions<string | number>, applyMaxScale?: boolean): UIManipulation;
    // size (elt: PIXI.Container, size: IEltDimensions<string | number> | string, applyMaxScale?: boolean): UIManipulation {
    //     this._sizeManager.manageSize(elt, size, applyMaxScale);
    //     return this;
    // }

    // manageSize (elt: PIXI.Container, size: IEltDimensions<string | number>, applyMaxSize?: boolean): void {
    //     if (typeof size.width === 'string' || typeof size.height === 'string') {
    //         this._applySizeInPercent(elt, size as IEltDimensions<string>, applyMaxSize);
    //
    //     }
    //     if (typeof size.width === 'number' || typeof size.height === 'number') {
    //         this._applySizeInStandartValue(elt, size as IEltDimensions<number>);
    //     }
    // }
    //
    // private _applySizeInPercent (elt: PIXI.Container, size: IEltDimensions<string> | string, applyMaxSize?: boolean): void {
    //     let gameStage: PIXI.Container = this._getGameStage();
    //     let gameWidth: number = gameStage.width,
    //         gameHeight: number = gameStage.height,
    //         eltWidth: number = elt.width,
    //         eltHeight: number = elt.height,
    //         targetWidthInPercent: number,
    //         targetHeightInPercent: number;
    //
    //     /**
    //      * If we want to scale element sides equal to each other
    //      */
    //     if (typeof size === 'string') {
    //         targetWidthInPercent = parseInt(size, 10);
    //         targetHeightInPercent = parseInt(size, 10);
    //         let targetAbsoluteWidth: number = gameWidth * (targetWidthInPercent / 100),
    //             targetAbsoluteHeight: number = gameHeight * (targetHeightInPercent / 100),
    //             targetScaleX: number = eltWidth / targetAbsoluteWidth,
    //             targetScaleY: number = eltHeight / targetAbsoluteHeight;
    //
    //         let finalScale = applyMaxSize ? Math.max(targetScaleX, targetScaleY) : Math.min(targetScaleX, targetScaleY);
    //
    //         elt.scale = new PIXI.Point(finalScale, finalScale);
    //         return;
    //     }
    //
    //     if (!eltWidth || !eltHeight) {
    //         throw new Error ('Element doesn\'t has width or height dimension');
    //     }
    //
    //     /**
    //      * If we want to scale element sides separately
    //      */
    //     targetWidthInPercent = parseInt((<IEltDimensions<string>>size).width, 10);
    //     targetHeightInPercent = parseInt((<IEltDimensions<string>>size).height, 10);
    //
    //     if (!isNaN(targetWidthInPercent)) {
    //         let absoluteTargetWidth: number = gameWidth * (targetWidthInPercent / 100),
    //             targetScaleX: PIXI.Point = new PIXI.Point(eltWidth / absoluteTargetWidth);
    //
    //         elt.scale = targetScaleX;
    //     }
    //
    //     if (!isNaN(targetHeightInPercent)) {
    //         let absoluteTargetHeight: number = gameHeight * (targetHeightInPercent / 100),
    //             targetScaleY: PIXI.Point = new PIXI.Point(elt.scale.x,eltHeight / absoluteTargetHeight);
    //
    //         elt.scale = targetScaleY;
    //     }
    // }
    //
    // private _applySizeInStandartValue (elt: PIXI.Container, size: IEltDimensions<number>) {
    //     if (typeof size.width === 'number') {
    //         elt.width = size.width;
    //     }
    //
    //     if (typeof size.height === 'number') {
    //         elt.height = size.height;
    //     }
    // }
}
