import { IEltDimensions } from "../ui.manager.interfaces";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";

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

    getGameSize (): IGameSize {
        let gameContainer = this._getGameStage();

        return {
            gameHeight: gameContainer.clientHeight,
            gameWidth: gameContainer.clientWidth
        };
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
            eltWidth: number = this._getAbsWidth(elt),
            eltHeight: number = this._getAbsHeight(elt),
            targetWidthInPercent: number,
            targetHeightInPercent: number;

        /**
         * If we want to scale element sides equal to each other
         */
        if (typeof size === 'string') {
            let targetAbsoluteWidth: number;
            let targetAbsoluteHeight: number;
            // let targetScaleX: number;
            // let targetScaleY: number;
            /**
             * Scale relative to element size
             */
            // if (size.indexOf('+') !== -1) {
            //     let addPercent: number = parseInt(size.replace('+', ''), 10);
            //     targetAbsoluteWidth = ~~(gameWidth * ((addPercent / 100)));
            //     targetAbsoluteHeight = ~~(gameHeight * ((addPercent / 100)));
            //     // targetScaleX = elt.scale.x * (1 + (addPercent / 100));
            //     // targetScaleY = elt.scale.y * (1 + (addPercent / 100));
            // } else if (size.indexOf('-') !== -1) {
            //     let addPercent: number = parseInt(size.replace('-', ''), 10);
            //     targetAbsoluteWidth = gameWidth * (1 - (addPercent / 100));
            //     targetAbsoluteHeight = gameHeight * (1 - (addPercent / 100));
            //     // targetScaleX = elt.scale.x * (1 - (addPercent / 100));
            //     // targetScaleY = elt.scale.y * (1 - (addPercent / 100));
            // }
            // /**
            //  * Scale relative to game size
            //  */
            // else {
                targetWidthInPercent = parseInt(size, 10);
                targetHeightInPercent = parseInt(size, 10);
                targetAbsoluteWidth = gameWidth * (targetWidthInPercent / 100);
                targetAbsoluteHeight = gameHeight * (targetHeightInPercent / 100);
                // targetScaleX = targetAbsoluteWidth / eltWidth;
                // targetScaleY = targetAbsoluteHeight / eltHeight;
            // }

            // targetAbsoluteWidth = gameWidth * (targetWidthInPercent / 100);
            // targetAbsoluteHeight = gameHeight * (targetHeightInPercent / 100);
            let targetScaleX: number = targetAbsoluteWidth / eltWidth;
            let targetScaleY: number = targetAbsoluteHeight / eltHeight;

            let finalScale = applyMaxSize ? Math.max(targetScaleX, targetScaleY) : Math.min(targetScaleX, targetScaleY);

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

        /**
         * Apply scale for x axis
         */
        if (!isNaN(targetWidthInPercent)) {
            let absoluteTargetWidth: number = gameWidth * (targetWidthInPercent / 100),
                targetScaleX: PIXI.Point = new PIXI.Point(absoluteTargetWidth / eltWidth, elt.scale.y);

            // elt.scale = targetScaleX;
            this._setElementScale(elt, targetScaleX);
        }

        /**
         * Apply scale for y axis
         */
        if (!isNaN(targetHeightInPercent)) {
            let absoluteTargetHeight: number = gameHeight * (targetHeightInPercent / 100),
                targetScaleY: PIXI.Point = new PIXI.Point(elt.scale.x,absoluteTargetHeight / eltHeight);

            // elt.scale = targetScaleY;
            this._setElementScale(elt, targetScaleY);
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
        return elt.width / elt.scale.x || 1;
    }

    private _getAbsHeight (elt: PIXI.Container): number {
        return elt.height / elt.scale.y || 1;
    }
}
