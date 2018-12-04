import Container = PIXI.Container;
import {INotificationContext} from "../common.interfaces/game.ui";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";

export class UIComponent {
    private _notificationContext: INotificationContext;
    private _notificationMethod: Function;
    protected element: Container = null;
    protected rootStage: Container = null;

    set notificationContext (context: INotificationContext) {
      this._notificationContext = context;
    }
    get notificationContext () {
      return this._notificationContext;
    }

    set notificationMethod (method: Function) {
      this._notificationMethod = method;
    }
    get notificationMethod () {
      return this._notificationMethod;
    }

    constructor (viewStage: Container, notificationContext: INotificationContext) {
        this.rootStage = viewStage;
        this.notificationContext = notificationContext;

        if (notificationContext.handleUINotification) {
            this.notificationMethod = notificationContext.handleUINotification;
        }
    }

    sendNotificationToMediator <T extends Notification<any>>(notification: T, notificationBody?: T[keyof T], notificationType?: string) {
        notification.body = notificationBody;
        this.notificationMethod.call(this.notificationContext, notification)
    }

    initUIComponent (startData?: any): void {
        this.prepareUI(startData);
        this.render(startData);
        this.afterRender(startData);
    }

    protected prepareUI (startData?: any): void {

    }

    protected render (startData?: any): void {

    }

    protected afterRender (startData?: any): void {

    }
}
