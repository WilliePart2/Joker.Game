import Container = PIXI.Container;
import {
    IDeclarationForCompiler,
    IElementTemplate,
    IGameStyle, IGameStyleSheet,
    INotificationContext,
    IExtendedContainer
} from "../common.interfaces/game.ui";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {Facade} from "../../../PureMVCMulticore/core/pureMVC/facade/Facade";
import {Compiler, UIManager} from "../../module.names";
import {SharedCompileElement} from "../../shared.notifications/shared.compiler.notification";
import { SimpleObserver } from "./simple.observer";
import { SharedAddClassToElement, SharedRemoveClassFromElement } from "../../shared.notifications/shared.ui.manager.notifications";
import { IGameSize } from "../common.interfaces/game.environment";

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

    async addClass(element: IExtendedContainer, className: string): Promise<void> {
        await this.getUIManager().sendNotification(SharedAddClassToElement, {
            element: element,
            payload: {
                className: className,
                styles: this._styles()
            }
        });
    }

    async removeClass (element: IExtendedContainer, className: string): Promise<void> {
        await this.getUIManager().sendNotification(SharedRemoveClassFromElement, {
            element: element,
            payload: {
                className: className,
                styles: this._styles()
            }
        });
    }

    getElement <T extends PIXI.Container>(elementId: string): T | null {
        let element = this.element;
        let neededElement: PIXI.Container = this._tryToFindChildLower(elementId);

        if (!neededElement) {
            do {
                let _elt = element.getChildByName(elementId);
                if (_elt) {
                    neededElement = _elt as PIXI.Container;
                    break;
                }
                element = element.parent;
            } while (element.parent);
        }

        return neededElement as T;
    }

    /**
     * @TODO: move to ui manipulation service. and use here only method invocation
     * @param elementId
     * @param elt
     * @private
     */
    private _tryToFindChildLower (elementId: string, elt?: PIXI.Container): PIXI.Container | null {
        let element = elt || this.element,
            neededElement: PIXI.Container;

        neededElement = element.getChildByName(elementId) as PIXI.Container;

        if (neededElement) {
            return neededElement;
        }

        if (element.children && element.children.length) {
            for (let i = 0; i < element.children.length; i++) {
                neededElement = this._tryToFindChildLower(elementId, element.children[i] as PIXI.Container);
                if (neededElement) {
                    return neededElement;
                }
            }
        }

        return null;
    }

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

    // @TODO: Think about does it normal that ui know about facade?
    // @TODO: Can we move this logic into mediator and subscribe for specific ui event?
    protected async prepareLayout (): Promise<Container> {
        let compiledElt = await this.getCompiler().sendNotification(SharedCompileElement, {
            layout: this._layout(),
            styles: this._styles()
        });

        return compiledElt;
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
    protected _styles (): IGameStyleSheet[] {
        return [] as any;
    }

    /**
     * Method perform adding ui component to stage
     * @param startData
     * @param element
     */
    protected render (element: Container, startData?: any): void {
        this.element = element;
        this.rootStage.addChild(this.element);
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

    protected getUIManager (): Facade {
        return Facade.getInstance(UIManager.name);
    }

    onResize (gameSize: IGameSize) {

    }
}
