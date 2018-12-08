import {UIComponent} from "../../../game.core/game.classes/ui.component";
import {IElementTemplate, IGameStyle} from "../../../game.core/common.interfaces/game.ui";

export class BackgroundCompilationTestUI extends UIComponent {

    // protected render(element: PIXI.Container, startData?: any): void {
    //     super.render(element, startData);
    // }

    protected _layout(): IElementTemplate {
        return {
            id: 'backgroundTestUI',
            elementType: PIXI.Sprite
        }
    }

    protected _styles(): IGameStyle[] {
        return super._styles();
    }
}
