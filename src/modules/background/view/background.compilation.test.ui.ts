import {UIComponent} from "../../../game.core/game.classes/ui.component";
import {IElementTemplate, IGameStyle, IGameStyleSheet} from "../../../game.core/common.interfaces/game.ui";
import {BGAssets} from "./assets.mapping";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";
import { ui } from "../../ui.manager/shortcuts/ui";

export class BackgroundCompilationTestUI extends UIComponent {

    protected _layout(): IElementTemplate {
        return {
            id: 'backgroundTestUI',
            elementType: PIXI.Sprite,
            children: [
                {
                    id: 'bgContainer',
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
            ]
        }
    }

    protected _styles(): IGameStyleSheet[] {
        return [{
            test_styles: {
                textureId: 'roomBackground.png'
            },
            test_styles_2: {
                scale: {
                    x: 0.1,
                    y: 0.1
                }
            }
        }]
    }

    async initUIComponent () {
        super.initUIComponent()
            .then(() => {
                let bgChild: PIXI.Sprite = this.getElement('backgroundChildElement_1') as PIXI.Sprite;
                // return this.addClass(bgChild, 'test_styles_2');
            })
            .then(() => {
                let bgChild: PIXI.Sprite = this.getElement('backgroundChildElement_1') as PIXI.Sprite;
                // this.removeClass(bgChild, 'test_styles_2');
            });
    }

    onResize (gameSize: IGameSize) {
        let bg: PIXI.Sprite = this.getElement('backgroundChildElement_1') as PIXI.Sprite;
        ui(bg)
            .size('50%');
        // let bgImageElt = this.getElement('backgroundChildElement_1');
        // bgImageElt.scale.set(0.5, 0.5);
        // ui(bgImageElt)
        //     .size('50%');
    }
}
