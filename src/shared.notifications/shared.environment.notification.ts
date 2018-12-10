import {Notification} from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameSize} from "../game.core/common.interfaces/game.environment";

export const SharedOnGameResize = Notification.getInstance<IGameSize>('SHARED_ON_GAME_RESIZE');
