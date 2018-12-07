import { IInstancesMap } from "../../../PureMVCMulticore/core/pureMVC/interfaces/IInstancesMap";
import { UIEvent } from "./ui.event";

type EventDeclaration = [string, Function[]];

export class SimpleObserver {
    static EVENT_NAME = 0;
    static EVENT_HANDLERS_LIST = 1;
    static __instances: IInstancesMap<SimpleObserver> = {};
    eventList:  EventDeclaration[] = [];

    static getInstance (multitonKey: string): SimpleObserver {
        if (!SimpleObserver.__instances[multitonKey]) {
            SimpleObserver.__instances[multitonKey] = new this();
        }

        return SimpleObserver.__instances[multitonKey];
    }

    on (eventName: string, handler: Function): void {
        let eventDeclaration: EventDeclaration = this.getEventDeclaration(eventName);
        
        if (eventDeclaration) {
            (eventDeclaration[SimpleObserver.EVENT_HANDLERS_LIST] as Array<Function>).push(handler);
            return;
        }

        this.eventList.push([eventName, [handler]]);
    }

    off (eventName: string, handler?: Function): void {
        let handlerDeclaration: EventDeclaration = this.getEventDeclaration(eventName);
        if (handlerDeclaration) {
            if (!handler) {
                handlerDeclaration[SimpleObserver.EVENT_HANDLERS_LIST] = [];
            } else {
                handlerDeclaration[SimpleObserver.EVENT_HANDLERS_LIST] = (handlerDeclaration[SimpleObserver.EVENT_HANDLERS_LIST] as Array<Function>)
                    .filter((declaredHandler: Function) => declaredHandler !== handler);
            }
        }
    }

    publish (eventName: string, eventData: any): void {
        let uiEvent = new UIEvent(eventName, eventData);
        let eventDeclaration: EventDeclaration = this.getEventDeclaration(eventName);
        if (eventDeclaration) {
            (eventDeclaration[SimpleObserver.EVENT_HANDLERS_LIST] as Array<Function>).forEach((handler: Function) => {
                if (uiEvent.isBuble()) {
                    handler(uiEvent);
                }
            });
        }
    }

    private getEventDeclaration (eventName: string): EventDeclaration {
        return this.eventList.find((declaration: EventDeclaration) => declaration[SimpleObserver.EVENT_NAME] === eventName);
    }
}
