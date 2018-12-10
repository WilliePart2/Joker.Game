import {IGameStyle, IGameStyleSheet} from "../../../game.core/common.interfaces/game.ui";
import {deepMerge} from "../../../game.core/utils/deepMerge";
import { getValue } from "../../../game.core/utils/get.value";

/**
 * Singleton
 * Main storage for styles in application
 */
export class StyleStore {
    static __instance: StyleStore = null;
    styleStore: IGameStyleSheet = {};
    oldStylesStore: IGameStyleSheet = {};

    static getInstance () {
        if (!this.__instance) {
            this.__instance = new this();
        }

        return this.__instance;
    }

    /**
     * Save all styles from styleSheet
     */
    private saveStyle (stylesObject: IGameStyleSheet) {
        Object.keys(stylesObject)
            .forEach((className: string) => this.styleStore[className] = stylesObject[className]);
    }

    /**
     * Handle style array for element
     */
    saveStyles (styles: IGameStyleSheet[]) {
        styles.forEach((style: IGameStyleSheet) => this.saveStyle(style));
    }

    /**
     * Perform style snapshot for each applying styles to element
     * IMPORTANT: Invoke each time when we add or remove class from element
     * @param element 
     * @param style 
     */
    makeStyleSnapshot (element: PIXI.Container, style: IGameStyle) {
        let oldSnapshot: IGameStyle = this.oldStylesStore[element.name] || {} as IGameStyle;
        let snapshot: IGameStyle = {} as IGameStyle;
        Object.keys(style)
            .forEach(
                    (key: string) => snapshot[key] = getValue((element as any)[key])
                );
        
        // create new object
        snapshot = {...snapshot};

        // update snapshot
        this.mergeProperty(snapshot, oldSnapshot);

        this.oldStylesStore[element.name] = snapshot;
    }

    mergeProperty (destinationObject: {[key: string]: any}, sourceObject: {[key: string]: any}): void {
        deepMerge(destinationObject, sourceObject);
    }

    getStyleSnapshot (element: PIXI.Container): IGameStyle | null {
        if (this.oldStylesStore[element.name]) {
            return {...this.oldStylesStore[element.name]};
        }
        return null;
    }

    isSnapshotExists (element: PIXI.Container): boolean {
        return !!this.oldStylesStore[element.name];
    }

    getStyleObject (className: string): IGameStyle | null {
        if (this.styleStore[className]) {
            return this.styleStore[className];
        }

        return null;
    }
}
