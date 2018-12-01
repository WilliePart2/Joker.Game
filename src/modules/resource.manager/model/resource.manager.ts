import {IResourceConfig} from "../resource.loader.interfaces";

export class ResourceManager {
    static loadManifest (pathToManifest: string, assetsManifest: string): Promise<IResourceConfig | null> {
        return this.loadResource(pathToManifest, assetsManifest) as Promise<IResourceConfig>;
    }

    private static async loadResource (basePath: string, resourceName: string): Promise<Object | null> {
        return fetch(`${basePath}/${resourceName}`, {
            mode: 'cors',
            method: 'GET'
        }).then((response: Response) => {
            if (response.ok) {
                return response.json();
            }

            return null
        })
    }
}