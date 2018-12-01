import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData, IRoomInitdataPlace} from "../../game.core/common.interfaces/game.data";

export const initRoom = Notification.getInstance<IGameInitData>("INIT_ROOM");
export const InitRoomPlace = Notification.getInstance<IRoomInitdataPlace>("INIT_PLACE_ROOM");