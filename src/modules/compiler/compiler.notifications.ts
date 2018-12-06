import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IElementTemplate, IGameStyle} from "../../game.core/common.interfaces/game.ui";

export const CompileLayout = Notification.getInstance<IElementTemplate>('COMPILE_LAYOUT');
export const CompileStyles = Notification.getInstance<IGameStyle>('COMPILE_STYLE');