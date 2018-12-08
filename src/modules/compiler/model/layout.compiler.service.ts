import {IElementTemplate, IExtendedContainer} from "../../../game.core/common.interfaces/game.ui";
import {CommonCompilerService} from "./common.compiler.service";

export class LayoutCompilerService extends CommonCompilerService {
    compile (layout: IElementTemplate): IExtendedContainer {
        let elementName: string = layout.id,
            constructor: typeof PIXI.Container = layout.elementType,
            children: IElementTemplate[] = layout.children,
            compiledElement: IExtendedContainer = this.compileElement(elementName, constructor);

        this.isSet(children, () => {
            children.forEach((template: IElementTemplate) => {
                compiledElement.addChild(this.compile(template));
            });
        });

        this.isSet(layout.classList, () => compiledElement.classList = layout.classList);

        // this.isSet(layout.textureId, () => {
        //     (compiledElement as PIXI.Sprite).texture = layout.textureId
        // });

        return compiledElement;
    }

    private  compileElement (elementName: string, constructor: typeof PIXI.Container): IExtendedContainer {
        let element: IExtendedContainer = new constructor() as IExtendedContainer;
        element.name = elementName;
        return element;
    }

    // private isSet (variable: any, action: Function): void {
    //     if (variable) {
    //         action()
    //     }
    // }
}
