import { UIPosition } from "./ui.manager.types";

export interface IEltDimensions<T> {
    width?: T;
    height?: T;
}

export interface IUIManager {
    size (size: IEltDimensions<string | number> | string, applyMaxScale?: boolean): IUIManager;
    size (element: PIXI.Container, size: IEltDimensions<string | number> | string, applyMaxScale?: boolean): IUIManager;

    position (side: UIPosition, gap?: number): IUIManager;
    position (element: PIXI.Container, side: UIPosition, gap?: number): IUIManager;

    zIndex (zIndex: number): IUIManager;
    zIndex (element: PIXI.Container, zIndex: number): IUIManager;

}