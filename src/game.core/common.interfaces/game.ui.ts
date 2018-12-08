export interface INotificationContext {
    handleUINotification: Function;
}

export interface IElementTemplate {
    id: string;
    elementType: typeof PIXI.Container;
    children?: IElementTemplate[];
    styles?: IGameStyle[],
    textureId?: string
}

export interface IGameStyle {
    [key: string]: any; // ultratype !!!
}

export interface IDeclarationForCompiler {
    layout: IElementTemplate;
    styles: IGameStyle[];
}

export interface IDeclarationForStyleCompiler {
    element: PIXI.Container;
    styles: IGameStyle[]
}
