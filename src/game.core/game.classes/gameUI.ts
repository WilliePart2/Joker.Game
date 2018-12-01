import Container = PIXI.Container;
import {INotificationContext} from "../common.interfaces/game.ui";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";

export class GameUI {
    private notificationContext: INotificationContext;
    private notificationMethod: Function;
    protected element: Container = null;
    protected rootStage: Container = null;

    constructor (viewStage: Container, notificationContext: INotificationContext) {
        this.rootStage = viewStage;
        this.setNotificationContext(notificationContext);

        if (notificationContext.handleUINotification) {
            this.setNotificationMethod(notificationContext.handleUINotification);
        }
    }

    setNotificationContext (notificationContext: INotificationContext) {
        this.notificationContext = notificationContext;
    }

    setNotificationMethod (notificationMethod: Function) {
        this.notificationMethod = notificationMethod;
    }

    // @TODO: Hide notification context and notification method inside getters and setters
    sendNotificationToMediator <T extends Notification<any>>(notification: T, notificationBody?: T[keyof T], notificationType?: string) {
        this.notificationMethod.call(this.notificationContext, notification)
    }
}