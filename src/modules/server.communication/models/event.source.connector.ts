import { IConnector } from "../interfaces/server.communication.common.interfaces";
import { IGameStateSubscriptionRequest } from "../interfaces/server.communications.request.interfaces";
import { getAbsPath } from "../utils/urls";
import { HeadersManager } from "./headers.manager";
import { createQueryString } from "../utils/data.handling";

export class EventSourceConnector implements IConnector {
    private _headersManager: HeadersManager = HeadersManager.getInstance();
    private _onOpen: (msg: MessageEvent) => void;
    private _onError: (msg: MessageEvent) => void;
    private _onClose: (msg: MessageEvent) => void;
    private _onMessage: (msg: MessageEvent) => void;
    private _connection: EventSource;

    connect (url: string, subscriptionData: IGameStateSubscriptionRequest): void {
        this._connection = new EventSource(getAbsPath(`${url}?${createQueryString(subscriptionData)}`));
        this._connection.onmessage = this._onMessage;
        this._connection.onerror = this._onError;
        this._connection.onopen = this._onOpen;
    }

    onMessage (callback: (msg: MessageEvent) => void) {
        this._onMessage = callback;
    }

    onClose (callback: (msg: MessageEvent) => void) {
        this._onClose = callback;
    }

    onError (callback: (msg: MessageEvent) => void) {
        this._onError = callback;
    }

    onOpen (callback: (msg: MessageEvent) => void) {
        this._onOpen = callback;
    }
}
