import Container = PIXI.Container;
import {INotificationContext} from "../common.interfaces/game.ui";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {Facade} from "../../../PureMVCMulticore/core/pureMVC/facade/Facade";
import {Compiler} from "../../module.names";
import {SharedCompileElement} from "../../shared.notifications/shared.compiler.notification";

export class UIComponent {
    private _notificationContext: INotificationContext;
    private _notificationMethod: Function;

    /**
     * Main element for this UI component
     */
    protected element: Container = null;

    /**
     * Link to root Stage of all application
     */
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
        this.prepareLayout();
    }

    protected prepareLayout () {
        let layout = this._layout();
        let styles = this._styles();
        let compilerElt = this.getCompiler().sendNotification(SharedCompileElement);
    }

    protected _layout () {

    }

    protected _styles () {

    }

    protected render (startData?: any): void {

    }

    protected afterRender (startData?: any): void {

    }

    protected getCompiler (): Facade {
        return Facade.getInstance(Compiler.name);
    }
}
