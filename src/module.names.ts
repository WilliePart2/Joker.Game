import {Notification} from "../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData, IGameStartupData} from "./game.core/common.interfaces/game.data";

export const MainGameModule = Notification.getInstance<IGameInitData>('INIT_GAME');
export const BackgroundModule = Notification.getInstance<IGameInitData>('BACKGROUND');
export const RoomModule = Notification.getInstance<IGameInitData>("ROOM");
export const ResourceLoaderModule = Notification.getInstance<IGameStartupData>('RESOURCE_LOADER');
export const Compiler = Notification.getInstance<undefined>('COMPILER');
