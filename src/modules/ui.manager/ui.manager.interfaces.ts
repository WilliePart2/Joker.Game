export interface IEltDimensions<T> {
    width?: T;
    height?: T;
}

export interface IUIManager {
    size (size: IEltDimensions<string | number> | string, applyMaxScale?: boolean): IUIManager;
    size (element: PIXI.Container, size: IEltDimensions<string | number> | string, applyMaxScale?: boolean): IUIManager;
}