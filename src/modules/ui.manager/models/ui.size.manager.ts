import { UIManipulation } from "./ui.manipulation.service";
import { IEltDimensions } from "../ui.manager.interfaces";

/**
 * Class which manage size of element
 * Singleton
 */
export class UiSizeManager {
    static _instance: UiSizeManager;
    private _gameStage: HTMLElement;
    static getInstance () {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    /**
     * Method for internal usage.
     * When game startup we init this module and set game stage
     * @param stage
     * @private
     */
    __setGameStage (stage: HTMLElement): void {
        this._gameStage = stage;
    }

    protected _getGameStage (): HTMLElement {
        return this._gameStage;
    }

    manageSize (elt: PIXI.Container, size: IEltDimensions<string | number> | string, applyMaxSize?: boolean): void {
        if (typeof size == 'string') {
            this._applySizeInPercent(elt, size, applyMaxSize);
        }

        if (typeof (size as IEltDimensions<string>).width === 'string' || typeof (size as IEltDimensions<string>).height === 'string') {
            this._applySizeInPercent(elt, size as IEltDimensions<string>, applyMaxSize);

        }
        if (typeof (size as IEltDimensions<number>).width === 'number' || typeof (size as IEltDimensions<number>).height === 'number') {
            this._applySizeInStandartValue(elt, size as IEltDimensions<number>);
        }
    }

    private _applySizeInPercent (elt: PIXI.Container, size: IEltDimensions<string> | string, applyMaxSize?: boolean): void {
        let gameStage: HTMLElement = this._getGameStage();
        let gameWidth: number = gameStage.clientWidth,
            gameHeight: number = gameStage.clientHeight,
            // eltWidth: number = elt.width / elt.scale.x,
            eltWidth: number = this._getAbsWidth(elt),
            // eltHeight: number = elt.height / elt.scale.y,
            eltHeight: number = this._getAbsHeight(elt),
            targetWidthInPercent: number,
            targetHeightInPercent: number;

        /**
         * If we want to scale element sides equal to each other
         */
        if (typeof size === 'string') {
            targetWidthInPercent = parseInt(size, 10);
            targetHeightInPercent = parseInt(size, 10);
            let targetAbsoluteWidth: number = gameWidth * (targetWidthInPercent / 100),
                targetAbsoluteHeight: number = gameHeight * (targetHeightInPercent / 100),
                targetScaleX: number = targetAbsoluteWidth / eltWidth,
                targetScaleY: number = targetAbsoluteHeight / eltHeight;

            let finalScale = applyMaxSize ? Math.max(targetScaleX, targetScaleY) : Math.min(targetScaleX, targetScaleY);

            // elt.scale.set(finalScale, finalScale);
            // elt.width = eltWidth * finalScale;
            // elt.height = eltHeight * finalScale;
            this._setElementScale(elt, new PIXI.Point(finalScale, finalScale));
            return;
        }

        if (!eltWidth || !eltHeight) {
            throw new Error ('Element doesn\'t has width or height dimension');
        }

        /**
         * If we want to scale element sides separately
         */
        targetWidthInPercent = parseInt((<IEltDimensions<string>>size).width, 10);
        targetHeightInPercent = parseInt((<IEltDimensions<string>>size).height, 10);

        if (!isNaN(targetWidthInPercent)) {
            let absoluteTargetWidth: number = gameWidth * (targetWidthInPercent / 100),
                targetScaleX: PIXI.Point = new PIXI.Point(eltWidth / absoluteTargetWidth);

            elt.scale = targetScaleX;
        }

        if (!isNaN(targetHeightInPercent)) {
            let absoluteTargetHeight: number = gameHeight * (targetHeightInPercent / 100),
                targetScaleY: PIXI.Point = new PIXI.Point(elt.scale.x,eltHeight / absoluteTargetHeight);

            elt.scale = targetScaleY;
        }
    }

    private _applySizeInStandartValue (elt: PIXI.Container, size: IEltDimensions<number>) {
        if (typeof size.width === 'number') {
            elt.width = size.width;
        }

        if (typeof size.height === 'number') {
            elt.height = size.height;
        }
    }

    private _setElementScale (elt: PIXI.Container, point: PIXI.Point): void {
        elt.scale = point;
    }

    private _getAbsWidth (elt: PIXI.Container): number {
        return elt.width / elt.scale.x;
    }

    private _getAbsHeight (elt: PIXI.Container): number {
        return elt.height / elt.scale.y;
    }
}
