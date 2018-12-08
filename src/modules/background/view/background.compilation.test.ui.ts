import {UIComponent} from "../../../game.core/game.classes/ui.component";
import {IElementTemplate, IGameStyle, IGameStyleSheet} from "../../../game.core/common.interfaces/game.ui";
import {BGAssets} from "./assets.mapping";

export class BackgroundCompilationTestUI extends UIComponent {

    // protected render(element: PIXI.Container, startData?: any): void {
    //     super.render(element, startData);
    // }

    protected _layout(): IElementTemplate {
        return {
            id: 'backgroundTestUI',
            elementType: PIXI.Sprite,
            children: [
                {
                    id: 'backgroundChildElement_1',
                    elementType: PIXI.Sprite,
                    classList: 'test_styles'
                },
                {
                    id: 'backgroundChildElement_2',
                    elementType: PIXI.Text
                }
            ]
        }
    }

    protected _styles(): IGameStyleSheet[] {
        return [{
            test_styles: {
                textureId: 'roomBackground.png'
            }
        }]
    }
}
