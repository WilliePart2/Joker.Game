import * as PIXI from 'pixi.js';

export class PixiClassesMapping {
    static instance: PixiClassesMapping = null;

    TextureCache: PIXI.loaders.TextureDictionary;
    BaseTexture: typeof PIXI.BaseTexture;
    Texture: typeof PIXI.Texture;
    Sprite: typeof PIXI.Sprite;
    Container: typeof PIXI.Container;
    Loader: PIXI.loaders.Loader;
    Resources: PIXI.loaders.ResourceDictionary;

    static getInstance () {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    constructor () {
        this.TextureCache = PIXI.utils.TextureCache;
        this.BaseTexture = PIXI.BaseTexture;
        this.Texture = PIXI.Texture;
        this.Sprite = PIXI.Sprite;
        this.Container = PIXI.Container;
        this.Loader = PIXI.loader;
        this.Resources = PIXI.loader.resources;
    }
}
