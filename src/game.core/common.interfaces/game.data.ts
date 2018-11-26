export interface IGameStartupData {
    routeForLoadingAssets: string;
    assetsManifest: string;
    pathToManifest: string;
    gameContainer: HTMLElement;
    serverAddress: string;
}

export interface IGameInitData {
    stage: PIXI.Container;
    communicationWrapper?: any; // don't used
}

export interface IInitGameAreaData {
    gameContainer: HTMLElement;
    containerWidth: number;
    containerHeight: number;
}
