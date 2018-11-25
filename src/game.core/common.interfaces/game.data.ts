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
