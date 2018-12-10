import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IWatchGameSizeStatement} from "./environment.interfaces";

export const WatchGameContainerSize = Notification.getInstance<IWatchGameSizeStatement>('WATCH_GAME_CONTAINER_SIZE');
export const WatchGameFocus = Notification.getInstance<any>('WATCH_GAME_FOCUS');