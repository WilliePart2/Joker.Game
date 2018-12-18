import { IGameStateSubscriptionRequest } from "./server.communications.request.interfaces";

export interface IRequestHeaders {
    [ket: string]: string;
}

export interface IConnector {
    connect: (url: string, subscriptionData: IGameStateSubscriptionRequest) => void;
    onOpen: (callback: (msg: MessageEvent) => void) => void;
    onClose: (callback: (msg: MessageEvent) => void) => void;
    onMessage: (callback: (msg: MessageEvent) => void) => void;
    onError: (callback: (msg: MessageEvent) => void) => void;
}
