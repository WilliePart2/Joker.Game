import { IExtendedContainer } from "../../../game.core/common.interfaces/game.ui";
import { UIManipulation } from "../models/ui.manipulation.service";
import { IEltDimensions, IUIManager } from "../ui.manager.interfaces";

export function ui (element: IExtendedContainer): IUIManager {
    let _element: PIXI.Container = element;

    let uiManipulation: IUIManager = UIManipulation.getInstance();

    return {
        size: (size: IEltDimensions<string | number> | string, applyMaxScale?: boolean) =>
            uiManipulation.size(_element, size, applyMaxScale)
    } as IUIManager;

    return uiManipulation;
}