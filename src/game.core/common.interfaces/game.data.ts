export interface IGameStartupData {
    routeForLoadingAssets: string;
    assetsManifest: string;
    pathToManifest: string;
    gameContainer: HTMLElement;
    serverAddress: string;
}

export interface IGameInitData {
    app?: PIXI.Application;
    stage: PIXI.Container;
    communicationWrapper?: any; // don't used
}

export interface IInitGameAreaData {
    gameContainer: HTMLElement;
    containerWidth: number;
    containerHeight: number;
}

export interface IRoomInitdataPlace {
    stage: PIXI.Container;
    //element room
    PlaceSprite:PIXI.Sprite;
    countPlace:number;
    //data
    nameRoom:string;
    idRoom:number;
}
