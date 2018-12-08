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
    classList: string;
}

export interface IGameStyle {
    textureId: string;
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
