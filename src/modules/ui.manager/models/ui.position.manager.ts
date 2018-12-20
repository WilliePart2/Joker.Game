import { IGameSize } from "../../../game.core/common.interfaces/game.environment";

export class UIPositionManager {
    static _instance: UIPositionManager;
    static getInstance () {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    dispozeElement (element: PIXI.Container, side: string, gameSize: IGameSize, gap?: number): void {
        switch (side) {
            case 'bottom':
                let yPoint: number = gameSize.gameHeight - (element.height + (gap || 0));
                element.position.y = yPoint;
                break;
            case 'top':
                element.position.y = 0 + (gap || 0);
                break;
            case 'right':
                element.position.x = (gameSize.gameWidth - (element.width + gap));
                break;
            case 'left':
                element.position.x = 0 + (gap || 0);
                break;
            case 'center':
                element.position.x = this._getCenterXPoint(element, gameSize);
                element.position.y = this._getCenterYPoint(element, gameSize);
                break;
            case 'xCenter':
                element.position.x = this._getCenterXPoint(element, gameSize);
                break;
            case 'yCenter':
                element.position.y = this._getCenterYPoint(element, gameSize);
        }
    }

    private _getCenterXPoint (element: PIXI.Container, gameSize: IGameSize): number {
        return (gameSize.gameWidth - element.width) / 2;
    }

    private _getCenterYPoint (element: PIXI.Container, gameSize: IGameSize): number {
        return (gameSize.gameHeight - element.height) / 2;
    }

    applyElementZIndex (element: PIXI.Container, zIndex: number): void {
        if (!element || !element.parent) {
            return;
        }

        let parent: PIXI.Container = element.parent;
        parent.removeChild(element) as PIXI.Container;
        parent.addChildAt(element, zIndex);
        (element as any).zIndex = zIndex;
    }
}
