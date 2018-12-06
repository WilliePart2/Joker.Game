export interface INotificationContext {
    handleUINotification: Function;
}

export interface IElementTemplate {
    id: string;
    elementType: PIXI.Container;
    children: IElementTemplate[];
    styles: IGameStyle[]
}

export interface IGameStyle {

}