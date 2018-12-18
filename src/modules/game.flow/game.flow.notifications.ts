import { Notification } from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { ISignInToGameRoomData } from "../server.communication/interfaces/server.communication.response.interfaces";

// export const SubscribeToGameStateSource = Notification.getInstance<ISignInToGameRoomData>('SubscribeToGameStateSource');
export const EnterToGame = Notification.getInstance('ENTER_TO_GAME');
