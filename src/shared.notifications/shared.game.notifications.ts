import { Notification } from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IGameInitData } from "../game.core/common.interfaces/game.data";

export const SharedOnGameInit = Notification.getInstance<IGameInitData>('SHARED_ON_GAME_INIT');