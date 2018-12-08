import {CommonCompilerService} from "./common.compiler.service";
import {
    IElementTemplate,
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

    async compile (element: IExtendedContainer, styles: IGameStyleSheet[]): Promise<PIXI.Container> {
        if (element.children) {
            this.compileChildren(element.children as IExtendedContainer[], styles);
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

    private handleSpecificProperties (element: PIXI.Container, style: IGameStyle): Promise<void> {
        return new Promise (resolve => {
            this.isSet(style.textureId, async () => {
                (element as PIXI.Sprite).texture = await this.getTextureByName(style.textureId);
                resolve();
            })
        })
    }

    parseClassList (classList: string): string[] {
        if (!classList) {
            return [];
        }
        return classList.split(' ');
    }

    getFinalStyleObject (styles: IGameStyle[]): IGameStyle {
        let finalStyles: IGameStyle = {} as IGameStyle;
        styles.forEach((style: IGameStyle) => {
            deepMerge(finalStyles, style);
        });

        return finalStyles;
    }

    /**
     * Save style snapshot only for first element compilation
     * @param element
     * @param propertiesToSave
     */
    saveStyleSnapshot (element: PIXI.Container, propertiesToSave: IGameStyle): void {
        if (!this.styleStore.isSnapshotExists(element)) {
            this.styleStore.makeStyleSnapshot(element, propertiesToSave);
        }
    }

    /**
     * Get old values for styles if we don't specify new
     * @param elementName
     * @param finalStyles
     */
    mergeStylesWithSnapshot (elementName: PIXI.Container, finalStyles: IGameStyle): IGameStyle {
        let styleSnapshot: IGameStyle = this.styleStore.getStyleSnapshot(elementName) || {} as IGameStyle;
        deepMerge(styleSnapshot, finalStyles);

        return styleSnapshot;
    }

    async getTextureByName (textureName: string): Promise<PIXI.Texture> {
        let texture: PIXI.Texture = await this.getResourceManager().sendNotification(SharedGetTextureByName, textureName);
        return texture
    }

    getResourceManager (): Facade {
        return Facade.getInstance(ResourceLoaderModule.name);
    }
}