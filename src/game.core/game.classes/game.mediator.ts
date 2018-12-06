import { Mediator } from "../../../PureMVCMulticore/core/pureMVC/mediator/Mediator";
import { Notification } from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { UIComponent } from "./ui.component";
import { Container } from "pixi.js";
import { INotificationContext } from "../common.interfaces/game.ui";

export type HandlerDeclaration = [string, Function];

export class GameMediator extends Mediator<typeof UIComponent | UIComponent> implements INotificationContext {
    _handledUINotificationList: Array<HandlerDeclaration>;
    /**
     * "Handler" decorator will use this props and store data inside
     */
    _handledNotificationList: Array<HandlerDeclaration> = [];
    _listNotificationInterests: Array<Notification<any>> = [];

    listNotificationInterests (): Notification<any>[] {
        return this._listNotificationInterests as Notification<any>[];
    };

    async handleNotification (notification: Notification<any>): Promise<any> {
        let notificationName: string = notification.name,
            handler: Function = this.findItem<Function>(this._handledNotificationList, notificationName);

        if (handler) {
            handler.call(this, notification);
        }
    };

    private rootStage: Container;

    constructor (rootStage: Container) {
        super();
        this.rootStage = rootStage;
    }

    handleUINotification (notification: Notification<any>): any {
        let handler: Function = this.findItem<Function>(this._handledUINotificationList, notification.name)

        if (handler) {
            handler.call(this, notification);
        } else {
            console.error(`Handler for notification: ${notification.name} doesn't exists`);
        }
    }

    registerUI (uiName: string, component: typeof UIComponent): void {
        this.registerClientObject(uiName, component);
    }

    createUIComponent (uiName: string, initData?: any): void {
        let uiComponent: typeof UIComponent = this.retrieveClientObject(uiName) as typeof UIComponent,
            activeComponent: UIComponent = new uiComponent(this.rootStage, this),
            prefixedUIName = this.getPefixedUIName(uiName);

        this.registerClientObject(prefixedUIName, activeComponent);
        activeComponent.initUIComponent(initData);
    }

    getUI (uiName: string): UIComponent | null {
        return this.retrieveClientObject(this.getPefixedUIName(uiName)) as UIComponent;
    }

    private getPefixedUIName (uiName: string, prefix: string = 'instance'): string {
        return `${uiName}_${prefix}`;
    }
}
