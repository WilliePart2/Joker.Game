/**
 * Singleton
 */
import {IGameStyle, IGameStyleSheet} from "../../../game.core/common.interfaces/game.ui";
import {deepMerge} from "../../../game.core/utils/deepMerge";

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

    private saveStyle (stylesObject: IGameStyleSheet) {
        Object.keys(stylesObject)
            .forEach((className: string) => this.styleStore[className] = stylesObject[className]);
    }

    saveStyles (styles: IGameStyleSheet[]) {
        styles.forEach((style: IGameStyleSheet) => this.saveStyle(style));
    }

    makeStyleSnapshot (element: PIXI.Container, style: IGameStyle) {
        let snapshot: IGameStyle = {};
        this.mergeProperty(snapshot, style);

        this.oldStylesStore[element.name] = snapshot;
    }

    mergeProperty (destinationObject: {[key: string]: any}, sourceObject: {[key: string]: any}): void {
        deepMerge(destinationObject, sourceObject);
        // Object.keys(sourceObject)
        //     .forEach((key: string) => {
        //         let value = sourceObject[key];
        //         if (Array.isArray(value)) {
        //             destinationObject[key] = [...value];
        //             return;
        //         }
        //
        //         if (typeof value === 'object') {
        //             destinationObject[key] = {};
        //             this.mergeProperty(destinationObject[key], value);
        //             return;
        //         }
        //
        //         destinationObject[key] = sourceObject[key];
        //     });
    }

    getStyleSnapshot (element: PIXI.Container): IGameStyle {
        return this.oldStylesStore[element.name];
    }

    isSnapshotExists (element: PIXI.Container): boolean {
        return !!this.oldStylesStore[element.name];
    }

    getStyleObject (className: string): IGameStyle {
        return this.styleStore[className];
    }
}
