import {IElementTemplate} from "../../../game.core/common.interfaces/game.ui";
import {Proxy} from "../../../../PureMVCMulticore/core/pureMVC/Proxy";

export class LayoutCompilerService extends Proxy {
    compile (layout: IElementTemplate): PIXI.Container {
        let elementName: string = layout.id,
            constructor: typeof PIXI.Container = layout.elementType,
            children: IElementTemplate[] = layout.children,
            compiledElement: PIXI.Container = this.compileElement(elementName, constructor);

        this.isSet(children, () => {
            children.forEach((template: IElementTemplate) => {
                compiledElement.addChild(this.compile(template));
            });
        });

        // this.isSet(layout.textureId, () => {
        //     (compiledElement as PIXI.Sprite).texture = layout.textureId
        // });

        return compiledElement;
    }

    private  compileElement (elementName: string, constructor: typeof PIXI.Container): PIXI.Container {
        let element: PIXI.Container = new constructor();
        element.name = elementName;
        return element;
    }

    private isSet (variable: any, action: Function): void {
        if (variable) {
            action()
        }
    }
}
