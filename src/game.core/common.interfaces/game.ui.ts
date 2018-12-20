export interface INotificationContext {
    handleUINotification: Function;
}

export interface IElementTemplate {
    id: string;
    elementType: typeof PIXI.Container;
    children?: IElementTemplate[];
    styles?: IGameStyle[],
    classList?: string
    textureId?: string
}

export interface IExtendedContainer extends PIXI.Container {
    classList?: string;
}

export interface IGameStyle {
    textureId?: string;
    scale?: {x: number, y: number};
    interactive?: boolean;
    [key: string]: any; // ultratype !!!
}

export interface IGameStyleSheet {
    [selector: string]: IGameStyle;
}

export interface IDeclarationForCompiler {
    layout: IElementTemplate;
    styles: IGameStyleSheet[];
}

export interface IDeclarationForStyleCompiler {
    element: IExtendedContainer;
    styles: IGameStyleSheet[]
}

/** Interfaces for UIManager */
export interface IUIManagerStatement<T> {
    element: IExtendedContainer;
    payload: T;
}
export interface IUIAddClassStatement extends IUIManagerStatement<{className: string, styles: IGameStyleSheet[]}> {}
export interface IUIRemoveClassStatement extends IUIManagerStatement<{className: string, styles: IGameStyleSheet[]}> {}
