import {Notification} from "../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData} from "./game.core/common.interfaces/game.data";

export const MainGameModule = Notification.getInstance<IGameInitData>('INIT_GAME');