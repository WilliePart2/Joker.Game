import {Notification} from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData, IInitGameAreaData, IRoomCreator,} from "../game.core/common.interfaces/game.data";

export const MountGameRenderer = Notification.getInstance<IGameInitData>('MOUNT_GAME_RENDERER');
export const PerformMountingGame = Notification.getInstance<IInitGameAreaData>('PERFORM_MOUNTING_GAME');

//NewBalanse
//export const Message = Notification.getInstance<IMessage>("MESSAGE_TO_CHAT");
export const RoomCreator = Notification.getInstance<IRoomCreator>("ROOM_CREATOR_GAME");