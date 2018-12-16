import { IExtendedContainer } from "../../../game.core/common.interfaces/game.ui";
import { UIManipulation } from "../models/ui.manipulation.service";
import { IEltDimensions, IUIManager } from "../ui.manager.interfaces";

let isInitialized: boolean = false;
export function ui (element: IExtendedContainer): IUIManager {
    let _element: PIXI.Container = element;

    let uiManipulation: IUIManager = UIManipulation.getInstance();

    return {
        size: (size: IEltDimensions<string | number> | string, applyMaxScale?: boolean) =>
            uiManipulation.size(_element, size, applyMaxScale)
    } as IUIManager;
    // if (!isInitialized) {
    //     let manageSize: Function = uiManipulation.size;
    //
    //     uiManipulation.size = function (size: IEltDimensions<string | number>, applyMaxScale?: boolean): UIManipulation {
    //         return manageSize(_element, size, applyMaxScale);
    //     } as any;

        // isInitialized = true;
    // }

    return uiManipulation;
}