import {Proxy} from "../../../../PureMVCMulticore/core/pureMVC/Proxy";
import {IResourceConfig, IResourceDeclaration, IResourceLoaderConfig} from "../resource.loader.interfaces";
import {TPlatform} from "../../../game.core/common.constants/platforms";
import {PixiClassesMapping} from "../../../game.core/pixi.classes.mapping";

export class AssetsManager extends Proxy {
    static NAME: string = 'AssetsManager';

    private PIXI: PixiClassesMapping = null;
    private loader: PIXI.loaders.Loader = null;
    private resources: PIXI.loaders.ResourceDictionary = null;
    private textureCache: PIXI.loaders.TextureDictionary = null;

    private baseAssetsPath: string;
    private platform: TPlatform;

    setInitialData (initData: IResourceLoaderConfig): void {
        this.PIXI = PixiClassesMapping.getInstance();
        this.loader = PIXI.loader;
        this.resources = PIXI.loader.resources;
        this.textureCache = PIXI.utils.TextureCache;

        this.baseAssetsPath = initData.assetsPath;
    }

    setPlatform (platform: TPlatform): void {
        this.platform = platform;
    }

    loadResources (resourcesList: IResourceDeclaration[]): Promise<boolean> {
        let resources: string[] = this.getResourceList(resourcesList);
        return new Promise(resolve => {
            PIXI.loader.add(resources)
                .load(() => resolve());
        });
    }

    private getResourceList (rawResourceList: IResourceDeclaration[]): string[] {
        return rawResourceList.reduce((storage: string[], resource: IResourceDeclaration) => {
            if (this.platformEqual(resource.platform, this.platform)) {
                storage.push(
                    ...resource.resourceURI.map((resource: string) => `${this.baseAssetsPath}/${resource}`)
                );
            }
            return storage;
        }, []);
    }

    private platformEqual (srcPlatform: string[], targetPlatform: string): boolean {
        return !!srcPlatform.find((platform: string) => platform === targetPlatform);
    }

    /**
     * Method can perform search by simple name as "someTexture" as by path as "path/someTexture"
     * @param imageName
     */
    getImage (imageName: string): PIXI.Texture | null {
        let resource: PIXI.loaders.Resource = PIXI.loader.resources[imageName];
        if (!resource) {
            for (let resourceName in PIXI.loader.resources) {
                let lastPathPart: string = resourceName.split('/').pop();
                if (lastPathPart === imageName) {
                    resource = PIXI.loader.resources[resourceName];
                    return resource.texture;
                }
            }
        }

        return null;
    }
}
