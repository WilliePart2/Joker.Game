export interface IRequestHeaders {
    [ket: string]: string;
}

export interface IConnector {
    connect: (url: string) => void;
    onOpen: (callback: Function) => void;
    onClose: (callback: Function) => void;
    onMessage: (callback: (msg: string) => any) => void;
    onError: (callback: Function) => void;
}
