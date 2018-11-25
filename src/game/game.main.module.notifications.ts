import {Notification} from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData, IInitGameAreaData} from "../game.core/common.interfaces/game.data";

export const MountGameRenderer = Notification.getInstance<IGameInitData>('MOUNT_GAME_RENDERER');
export const PerformMountingGame = Notification.getInstance<IInitGameAreaData>('PERFORM_MOUNTING_GAME');