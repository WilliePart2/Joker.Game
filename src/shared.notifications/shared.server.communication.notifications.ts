import { Notification } from "../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IGameStateSubscriptionRequest } from "../modules/server.communication/interfaces/server.communications.request.interfaces";

export const SharedAuthenticateUser = Notification.getInstance('SHARED_AUTHENTICATE_USER');
export const SharedSignInToGameRoom = Notification.getInstance('SHARED_SIGN_IN_TO_GAME_ROOM');
export const SharedSubscribeToGameStateSource = Notification.getInstance<IGameStateSubscriptionRequest>('SHARED_SUBSCRIBE_TO_GAME_STATE_SOURCE');
