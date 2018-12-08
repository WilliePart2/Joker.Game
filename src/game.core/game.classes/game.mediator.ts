import { Mediator } from "../../../PureMVCMulticore/core/pureMVC/mediator/Mediator";
import { Notification } from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { UIComponent } from "./ui.component";
import { Container } from "pixi.js";
import { INotificationContext } from "../common.interfaces/game.ui";
import {SimpleObserver} from "./simple.observer";

export type HandlerDeclaration = [string, Function];

export class GameMediator extends Mediator<typeof UIComponent | UIComponent> implements INotificationContext {
    /**
     * @deprecated
     * Used more simple way to build communications between mediator and ui
     */
    _handledUINotificationList: Array<HandlerDeclaration>;
    private rootStage: Container;

    constructor (facadeKey: string, rootStage: Container) {
        super(facadeKey);
        this.rootStage = rootStage;
    }

    /**
     * @deprecated
     * Used more simple way to build communications between mediator and ui
     * @param notification
     */
    handleUINotification (notification: Notification<any>): any {
        let handler: Function = this.findItem<Function>(this._handledUINotificationList, notification.name);

        if (handler) {
            handler.call(this, notification);
        } else {
            console.error(`Handler for notification: ${notification.name} doesn't exists`);
        }
    }

    registerUI (uiName: string, component: typeof UIComponent): void {
        this.registerClientObject(uiName, component);
    }

    unregisterUI (uiName: string): void {
        this.dropClientObject(uiName);
    }

    async createUIComponent (uiName: string, initData?: any): Promise<void> {
        let uiComponent: typeof UIComponent = this.retrieveClientObject(uiName) as typeof UIComponent,
            activeComponent: UIComponent = new uiComponent(this.rootStage, this.mediatorKey),
            prefixedUIName = this.getPefixedUIName(uiName);

        this.registerClientObject(prefixedUIName, activeComponent);
        await activeComponent.initUIComponent(initData);
    }

    dropUIComponent (uiName: string): void {
        let ui: UIComponent = this.getUI(uiName),
            uiInstanceName: string = this.getPefixedUIName(uiName);

        if (ui) {
            ui.onDestroy();
            this.dropClientObject(uiInstanceName);
        }
    }

    getUI (uiName: string): UIComponent | null {
        return this.retrieveClientObject(this.getPefixedUIName(uiName)) as UIComponent;
    }

    private getPefixedUIName (uiName: string, prefix: string = 'instance'): string {
        return `${uiName}_${prefix}`;
    }

    uiEventsContext (): SimpleObserver {
        return SimpleObserver.getInstance(this.mediatorKey);
    }
}
