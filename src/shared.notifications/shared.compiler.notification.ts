import {Notification} from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IDeclarationForCompiler, IElementTemplate} from "../game.core/common.interfaces/game.ui";

export const SharedCompileElement = Notification.getInstance<IDeclarationForCompiler>('COMPILE_ELEMENT');