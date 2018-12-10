import { Notification } from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IUIAddClassStatement, IUIRemoveClassStatement } from "../game.core/common.interfaces/game.ui";

export const SharedAddClassToElement = Notification.getInstance<IUIAddClassStatement>('SHARED_ADD_CLASS_TO_ELEMENT');
export const SharedRemoveClassFromElement = Notification.getInstance<IUIRemoveClassStatement>('SHARED_REMOVE_CLASS_FROM_ELEMENT');