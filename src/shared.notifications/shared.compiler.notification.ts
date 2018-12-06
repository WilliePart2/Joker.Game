import {Notification} from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IElementTemplate} from "../game.core/common.interfaces/game.ui";

export const SharedCompileElement = Notification.getInstance<IElementTemplate>('COMPILE_ELEMENT');