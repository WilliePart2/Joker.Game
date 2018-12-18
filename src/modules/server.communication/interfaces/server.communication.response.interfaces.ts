import { TResponseTypes, TTableType } from "../../../types.map";
import { IGameInfo } from "../../../shared.interfaces/game.interfaces";

export interface ISignInToGameRoomData {
    gameRoomId: string;
    type: TTableType;
    ownerId: string;
    game: IGameInfo;
}

export interface IUserObject {
    id: string; // mongoose objectId
    name: string;
}

export interface IAuthenticationResponse {
    user: IUserObject;
}

export interface ICommonResponse<T = any> {
    status: TResponseTypes;
    payload?: T;
}
