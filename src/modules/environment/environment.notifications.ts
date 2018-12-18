import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IWatchGameSizeStatement} from "./environment.interfaces";
import { IGameInitData } from "../../game.core/common.interfaces/game.data";

export const WatchGameContainerSize = Notification.getInstance<IWatchGameSizeStatement>('WATCH_GAME_CONTAINER_SIZE');
export const WatchGameFocus = Notification.getInstance<any>('WATCH_GAME_FOCUS');
export const SetEnvironmentInitData = Notification.getInstance<IGameInitData>('SET_ENVIRONMENT_INIT_DATA');