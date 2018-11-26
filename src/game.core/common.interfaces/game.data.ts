export interface IGameInitData {
    containerId: string;
    serverAddress: string;
    communicationWrapper: any;
}

export interface IInitGameAreaData {
    gameContainer: HTMLElement;
    containerWidth: number;
    containerHeight: number;
}


//create NewBalanse chat
export interface IMessage {
    nameUser: string;
    messageBod: string;
}// fuck out this chat!!

export interface IUser {
    nameUser: string;
    userId: number;
}

//For create room
export interface IRoomInitData {
    container: string;
    server: string;
}

export interface IRoomCreator {
    roomId: number;
    nameRoom: string;
    countPlace: number;

    roomContainer: HTMLElement;
    passwordOfRoom: string;
}
