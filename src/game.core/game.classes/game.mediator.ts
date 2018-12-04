import { Mediator } from "../../../PureMVCMulticore/core/pureMVC/mediator/Mediator";
import { Notification } from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { UIComponent } from "./ui.component";
import { Container } from "pixi.js";
import { INotificationContext } from "../common.interfaces/game.ui";

export type HandlerDeclaration = [string, Function];
type ComponentDeclaration = [string, typeof UIComponent];
type UIComponentsList = [string, UIComponent];
export class GameMediator extends Mediator implements INotificationContext {
    static ITEM_NAME = 0;
    static ITEM_PAYLOAD = 1;
    _handledNotificationList: Array<HandlerDeclaration>;
    _uiComponentsMap: Array<ComponentDeclaration> = [];
    _componentsInstaneList: Array<UIComponentsList> = [];
    private rootStage: Container;

    constructor (facadeKey: string, rootStage: Container) {
        super(facadeKey);
        this.rootStage = rootStage;
        this.onInit();
    }

    handleUINotification (notification: Notification<any>): any {
        // let handlerDeclaration = this._handledNotificationList.find((notifHandler: HandlerDeclaration) => {
        //     return notifHandler[GameMediator.NOTIFICCATION].name === notification.name;
        // })
        let handler: Function = this.findItem<Function>(this._handledNotificationList, notification.name)

        if (handler) {
            // let handler: Function = handler[GameMediator.HANDLER] as Function;
            handler.call(this, notification);
        } else {
            console.error(`Handler for notification: ${notification.name} doesn't exists`);
        }
    }

    private findItem <T>(storage: Array<[string, T]>, itemName: string): T | null {
        let item = storage.find((item: [string, T]) => {
            return item[GameMediator.ITEM_NAME] === itemName;
        });

        if (item) {
            return item[GameMediator.ITEM_PAYLOAD] as T;
        }

        return null;
    }

    protected onInit (): void {

    }

    registerUI (uiName: string, component: typeof UIComponent): void {
        this._uiComponentsMap.push([uiName, component]);
    }

    createUIComponent (uiName: string, initData?: any): void {
        let uiComponent: typeof UIComponent = this.findItem<typeof UIComponent>(this._uiComponentsMap, uiName);
        let activeComponent: UIComponent = new uiComponent(this.rootStage, this);
        this._componentsInstaneList.push([uiName, activeComponent]);
        activeComponent.initUIComponent(initData);
    }

    getUI (uiName: string): UIComponent | null {
        return this.findItem<UIComponent>(this._componentsInstaneList, uiName);
    }
}
