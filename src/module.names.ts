import {Notification} from "../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData, IGameStartupData} from "./game.core/common.interfaces/game.data";

export const MainGameModule = Notification.getInstance<IGameStartupData>('INIT_GAME');
export const BackgroundModule = Notification.getInstance<IGameInitData>('BACKGROUND');
export const RoomModule = Notification.getInstance<IGameInitData>("ROOM");
export const ResourceLoaderModule = Notification.getInstance<IGameStartupData>('RESOURCE_LOADER');
export const Compiler = Notification.getInstance<undefined>('COMPILER');
export const UIManager = Notification.getInstance<IGameStartupData>('UI_MANAGER');
export const Environment = Notification.getInstance<IGameStartupData>('ENVIRONMENT');
export const ServerCommunicationModule = Notification.getInstance('SERVER_COMMUNICATION');
export const GameFlowModule = Notification.getInstance('GAME_FLOW');
export const MTCModule = Notification.getInstance<IGameInitData>('MESSAGE_TO_CLIENT');
export const PlayerCards = Notification.getInstance<IGameInitData>('PLAYER_CARDS');
