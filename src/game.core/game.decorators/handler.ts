import { Notification } from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { GameMediator, HandlerDeclaration } from "../game.classes/game.mediator";

/**
 * Decorator for mediator.
 * Decorator receive notification and bind handler for this notification
 */
export function handler (notification: Notification<any>): Function {
    return function (classPrototype: GameMediator, key: string, descriptor: PropertyDescriptor):  void {
        if (!Array.isArray(classPrototype._handledNotificationList)) {
            classPrototype._handledNotificationList = [];
        }

        let handler: Function = (classPrototype as any)[key] as Function;
        let handlerDeclaration: HandlerDeclaration = [notification.name, handler];
        classPrototype._handledNotificationList.push(handlerDeclaration);
    }
}