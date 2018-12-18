import { Proxy } from "../../../../PureMVCMulticore/core/pureMVC/Proxy";
import {
    IAuthenticationResponse, ICommonResponse,
    ISignInToGameRoomData,
    IUserObject
} from "../interfaces/server.communication.response.interfaces";
import { HeadersManager } from "./headers.manager";
import { EventSourceConnector } from "./event.source.connector";
import { getAbsPath } from "../utils/urls";
import { AuthenticationManager } from "./authentication.manager";
import { IGameStateSubscriptionRequest } from "../interfaces/server.communications.request.interfaces";
import { getResponsePayload } from "../utils/data.handling";

export class ServerCommunicationService extends Proxy {
    static NAME = 'ServerCommunicationService';
    private _headersManager: HeadersManager = HeadersManager.getInstance();
    private _stateUpdatesChanel: EventSourceConnector;
    private _authenticationManager: AuthenticationManager = new AuthenticationManager();

    /**
     * Method retrieve start data for gaming in current room
     */
    async signInToGameRoom (): Promise<ISignInToGameRoomData | null> {
        let resp: Response = await fetch(getAbsPath('sign-in-to-room'), {
            method: 'GET',
            headers: this._headersManager.getRequestHeaders()
        });

        if (resp.ok) {
            return resp.json();
        } else {
            return null;
        }
    }

    subscribeToGameStateUpdates (subscriptionData: IGameStateSubscriptionRequest): Promise<any> {
        return new Promise((resolve, reject)=> {
            this._stateUpdatesChanel = new EventSourceConnector();
            this._stateUpdatesChanel.onMessage((msg: MessageEvent) => {
                console.log(msg.data);
            });
            this._stateUpdatesChanel.onOpen(() => resolve);
            this._stateUpdatesChanel.onClose(() => {});
            this._stateUpdatesChanel.onError(() => reject);
            this._stateUpdatesChanel.connect('subscribe-to-game-state', subscriptionData);
        });
    }

    async authenticateUser (): Promise<IUserObject> {
        let userObjectResponse: ICommonResponse<IAuthenticationResponse> = await this._authenticationManager.authenticateUser(),
            authResponse: IAuthenticationResponse = getResponsePayload(userObjectResponse),
            user: IUserObject = authResponse.user;

        return user;
    }
}
