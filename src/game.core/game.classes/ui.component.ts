import Container = PIXI.Container;
import {
    IDeclarationForCompiler,
    IElementTemplate,
    IGameStyle,
    INotificationContext
} from "../common.interfaces/game.ui";
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

    /**
     * With asynchronous rendering we could fetch textures and only then render UI
     * @param startData
     */
    async initUIComponent (startData?: any): Promise<void> {
        let compiledElt: Container = await this.prepareUI(startData);
        this.render(compiledElt, startData);
        this.onInit(startData);
    }

    protected prepareUI (startData?: any): Promise<Container> {
        return this.prepareLayout();
    }

    protected async prepareLayout (): Promise<Container> {
        return await this.getCompiler().sendNotification(SharedCompileElement, {
            layout: this._layout(),
            styles: this._styles()
        });
    }

    /**
     * This method should return out layout
     * @private
     */
    protected _layout (): IElementTemplate {
        return {} as any;
    }

    /**
     * This method should return out styles
     * @private
     */
    protected _styles (): IGameStyle[] {
        return [] as any;
    }

    /**
     * Method perform adding ui component to stage
     * @param startData
     * @param element
     */
    protected render (element: Container, startData?: any): void {
        this.element = element;
        this.rootStage.addChild(element);
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
