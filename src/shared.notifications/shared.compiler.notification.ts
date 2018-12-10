import {Notification} from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IDeclarationForCompiler, IElementTemplate, IDeclarationForStyleCompiler} from "../game.core/common.interfaces/game.ui";

export const SharedCompileElement = Notification.getInstance<IDeclarationForCompiler>('COMPILE_ELEMENT');
export const SharedRecompileStyles = Notification.getInstance<IDeclarationForStyleCompiler>('RECOMPILE_STYLES');
