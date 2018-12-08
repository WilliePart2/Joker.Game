import Container = PIXI.Container;
import {INotificationContext} from "../common.interfaces/game.ui";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {Facade} from "../../../PureMVCMulticore/core/pureMVC/facade/Facade";
import {Compiler} from "../../module.names";
import {SharedCompileElement} from "../../shared.notifications/shared.compiler.notification";
import { SimpleObserver } from "./simple.observer";

export class UIComponent {
    private _notificationContext: SimpleObserver;
    // private _notificationMethod: Function;

    /**
     * Main element for this UI component
     */
    protected element: Container = null;

    /**
     * Link to root Stage of all application
     */
    protected rootStage: Container = null;
    protected eventContextKey: string;

    set notificationContext (context: SimpleObserver) {
      this._notificationContext = context;
    }
    get notificationContext () {
      return this._notificationContext;
    }

    // set notificationMethod (method: Function) {
    //   this._notificationMethod = method;
    // }
    // get notificationMethod () {
    //   return this._notificationMethod;
    // }

    constructor (viewStage: Container, contextKey: string) {
        this.rootStage = viewStage;
        this.eventContextKey = contextKey;
        this.notificationContext = SimpleObserver.getInstance(contextKey);

        // if (notificationContext.handleUINotification) {
        //     this.notificationMethod = notificationContext.handleUINotification;
        // }
    }

    on (eventName: string, handler: Function): void {
        this.notificationContext.on(eventName, handler);
    }

    off (eventName: string, handler?: Function): void {
        this.notificationContext.off(eventName, handler);
    }

    publish (eventName: string, eventData: any): void {
        this.notificationContext.publish(eventName, eventData);
    }

    // sendNotificationToMediator <T extends Notification<any>>(notification: T, notificationBody?: T[keyof T], notificationType?: string) {
    //     notification.body = notificationBody;
    //     this.notificationMethod.call(this.notificationContext, notification)
    // }

    initUIComponent (startData?: any): void {
        this.prepareUI(startData);
        this.render(startData);
        this.onInit(startData);
    }

    protected prepareUI (startData?: any): void {
        this.prepareLayout();
    }

    protected prepareLayout () {
        let layout = this._layout();
        let styles = this._styles();
        let compilerElt = this.getCompiler().sendNotification(SharedCompileElement);
    }

    /**
     * This method should return out layout
     * @private
     */
    protected _layout () {

    }

    /**
     * This method should return out styles
     * @private
     */
    protected _styles () {

    }

    /**
     * Method perform adding ui component to stage
     * @param startData
     */
    protected render (startData?: any): void {

    }

    /**
     * Fired after component initialization. When component already exists in stage
     * @param startData
     */
    protected onInit (startData?: any): void {

    }

    /**
     * Method fired before destroying mediator
     */
    onDestroy (): void {}

    protected getCompiler (): Facade {
        return Facade.getInstance(Compiler.name);
    }
}
