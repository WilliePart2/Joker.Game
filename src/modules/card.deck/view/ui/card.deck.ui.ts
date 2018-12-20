import { UIComponent } from "../../../../game.core/game.classes/ui.component";
import { IGameSize } from "../../../../game.core/common.interfaces/game.environment";
import { IElementTemplate, IGameStyleSheet } from "../../../../game.core/common.interfaces/game.ui";
import { ui } from "../../../ui.manager/shortcuts/ui";
import { TUIChain } from "../../../../zindex.ui.values";

export class CardDeckUI extends UIComponent {

    protected _layout(): IElementTemplate {
        return {
            id: 'CardDeck',
            elementType: PIXI.Sprite,
            classList: 'CardDeckStyles'
        };
    }

    protected _styles(): IGameStyleSheet[] {
        return [{
            CardDeckStyles: {
                textureId: 'cadr_deck.png',
                scale: { x: 0.3, y: 0.3 }
            }
        }];
    }

    protected onInit(startData?: any): void {
        let deck: PIXI.Sprite = this.getElement('CardDeck');

        if (deck) {
            ui(deck)
                .zIndex(deck.parent.children.length - 1)
                .position('right', 10)
                .position('yCenter');
        }
    }

    onResize(gameSize: IGameSize) {
        let deck: PIXI.Sprite = this.getElement('CardDeck');

        if (deck) {
            ui(deck)
                .position('right', 10)
                .position('yCenter');
                // .zIndex(deck.parent.children.length - 1)
        }
    }
}
