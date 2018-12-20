import { IExtendedContainer } from "../../../game.core/common.interfaces/game.ui";
import { UIManipulation } from "../models/ui.manipulation.service";
import { IEltDimensions, IUIManager } from "../ui.manager.interfaces";
import { UIPosition } from "../ui.manager.types";

export function ui (element: IExtendedContainer): IUIManager {
    let _element: PIXI.Container = element;

    let uiManipulation: IUIManager = UIManipulation.getInstance();

    return {
        size (size: IEltDimensions<string | number> | string, applyMaxScale?: boolean) {
            uiManipulation.size(_element, size, applyMaxScale);
            return this;
        },
        position (side: UIPosition, gap?: number) {
            uiManipulation.position(_element, side as any, gap);
            return this;
        },
        zIndex (zIndex: number) {
            uiManipulation.zIndex(_element, zIndex);
            return this;
        }
    } as IUIManager;
}