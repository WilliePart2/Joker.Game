import {CommonCompilerService} from "./common.compiler.service";
import {
    IExtendedContainer,
    IGameStyle,
    IGameStyleSheet
} from "../../../game.core/common.interfaces/game.ui";
import {StyleStore} from "./style.store";
import {deepMerge} from "../../../game.core/utils/deepMerge";
import {Facade} from "../../../../PureMVCMulticore/core/pureMVC/facade/Facade";
import {ResourceLoaderModule} from "../../../module.names";
import {SharedGetTextureByName} from "../../../shared.notifications/shared.resource.manager.notifications";

export class StyleCompilerService extends CommonCompilerService {
    static NAME = 'StyleCompilerService';
    styleStore: StyleStore = null;

    /**
     * Main entry point for compilation styles
     * Invoke in first time when we create element
     * And invoke each time when we add class or remove class from element
     * @param element 
     * @param styles 
     */
    async compile (element: IExtendedContainer, styles: IGameStyleSheet[]): Promise<PIXI.Container> {
        if (Array.isArray(element.children) && element.children.length) {
            await this.compileChildren(element.children as IExtendedContainer[], styles);
        }
        this.styleStore = StyleStore.getInstance();
        this.styleStore.saveStyles(styles);

        let classList = this.parseClassList(element.classList),
            stylesQueue: IGameStyle[] = classList.map((className: string) => this.styleStore.getStyleObject(className)),
            preFinalStyles: IGameStyle = this.getFinalStyleObject(stylesQueue),
            finalStyles: IGameStyle = this.mergeStylesWithSnapshot(element, preFinalStyles);

        this.saveStyleSnapshot(element, finalStyles);
        await this.applyStylesToElement(element, finalStyles);

        return element;
    }

    /**
     * @TODO: Need to decrease count of style compilation/recompilation esspecialy in case of many child elements
     * @param childElements
     * @param styles
     */
    async compileChildren (childElements: IExtendedContainer[], styles: IGameStyleSheet[]): Promise<IExtendedContainer[]> {
        let compiledElts = await Promise.all(
            childElements.map((childElt: IExtendedContainer) => this.compile(childElt, styles))
        ) as IExtendedContainer[];

        return compiledElts;
    }

    async applyStylesToElement (element: PIXI.Container, styles: IGameStyle): Promise<void> {
        await this.handleSpecificProperties(element, styles);
        deepMerge(element, styles);
    }

    /**
     * Handle properties which need special workaround
     */
    private handleSpecificProperties (element: PIXI.Container, style: IGameStyle): Promise<any> {
        return Promise.all([
            this.setTexture(element, style)
        ])
            .then(() => this.setScale(element, style))
    }

    private setScale (element: PIXI.Container, style: IGameStyle) {
        if (style.scale) {
            let { scale } = style;
            element.scale = new PIXI.Point(scale.x, scale.y)
            delete style.scale;
        }
    }

    private async setTexture (element: PIXI.Container, style: IGameStyle): Promise<void> {
        if (style.textureId) {
            let texture = await this.getTextureById(style.textureId);
            (element as PIXI.Sprite).texture = texture;
        }
    }

    parseClassList (classList: string): string[] {
        if (!classList) {
            return [];
        }
        return classList.split(' ');
    }

    /**
     * Create final style object from array of styles
     * More lastest objects revrite previous object
     */
    getFinalStyleObject (styles: IGameStyle[]): IGameStyle {
        let finalStyles: IGameStyle = {} as IGameStyle;
        styles.forEach((style: IGameStyle) => {
            deepMerge(finalStyles, style || {});
        });

        return finalStyles;
    }

    /**
     * Save style snapshot only for each element compilation
     * @param element
     * @param propertiesToSave
     */
    saveStyleSnapshot (element: PIXI.Container, propertiesToSave: IGameStyle): void {
        this.styleStore.makeStyleSnapshot(element, propertiesToSave);
    }

    /**
     * Get old values for styles if we don't specify new
     * When we remove class we remove values determined by the class and add old values for properties
     * @param elementName
     * @param finalStyles
     */
    mergeStylesWithSnapshot (elementName: PIXI.Container, finalStyles: IGameStyle): IGameStyle {
        let styleSnapshot: IGameStyle = this.styleStore.getStyleSnapshot(elementName) || {} as IGameStyle;
        deepMerge(styleSnapshot, finalStyles);

        return styleSnapshot;
    }

    async getTextureById (textureName: string): Promise<PIXI.Texture> {
        let texture: PIXI.Texture = await this.getResourceManager().sendNotification(SharedGetTextureByName, textureName);
        return texture
    }

    getResourceManager (): Facade {
        return Facade.getInstance(ResourceLoaderModule.name);
    }
}