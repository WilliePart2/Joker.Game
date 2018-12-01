import {TPlatform} from "../../game.core/common.constants/platforms";

export interface IResourceLoaderConfig {
    assetsPath: string;
    resources: IResourceConfig[];
}

export interface IResourceConfig {
    assetsPath: string;
    resources: Array<IResourceDeclaration>;
}

export interface IResourceDeclaration {
    platform: Array<TPlatform>;
    resourceURI: string[];
}

export interface ILoadManifestData {
    assetsManifest: string;
    pathToManifest: string;
}
