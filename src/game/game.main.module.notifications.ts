import {Notification} from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData, IGameStartupData, IInitGameAreaData} from "../game.core/common.interfaces/game.data";

export const MountGameRenderer = Notification.getInstance<IGameStartupData>('MOUNT_GAME_RENDERER');
export const PerformMountingGame = Notification.getInstance<IInitGameAreaData>('PERFORM_MOUNTING_GAME');
export const StartupMainModules = Notification.getInstance<IGameInitData>('STARTUP_MAIN_MODULES');
export const TriggerOnGameInit = Notification.getInstance<IGameInitData>('TRIGGER_ON_GAME_INIT');
