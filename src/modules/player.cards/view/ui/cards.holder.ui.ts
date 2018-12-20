import { UIComponent } from "../../../../game.core/game.classes/ui.component";
import { IElementTemplate, IGameStyle, IGameStyleSheet } from "../../../../game.core/common.interfaces/game.ui";
import { TSuitTypes } from "../TSuitTypes";
import { TCardTypes } from "../card.types";
import { IGameSize } from "../../../../game.core/common.interfaces/game.environment";
import { ui } from "../../../ui.manager/shortcuts/ui";

export class CardsHolderUI extends UIComponent {
    static CARD_COUNT = 15;

    protected _layout(): IElementTemplate {
        let cards: IElementTemplate[] = [];
        let startPoint = 2;
        for (let i = startPoint; i < CardsHolderUI.CARD_COUNT + startPoint; i++) {
            let cardSuit: string = TSuitTypes[1];
            cards.push({
                id: this.getCardId(i - startPoint, cardSuit),
                elementType: PIXI.Sprite,
                classList: this.getCardClassName(i)
            });
        }

        return {
            id: 'PlayerCardsHolder',
            elementType: PIXI.Container,
            children: cards
        };
    }


    protected _styles(): IGameStyleSheet[] {
        let cardStyles: IGameStyle = {};
        let positionStartPoint = 0;
        let positionXShift = 60;

        for (let idx = 0; idx < CardsHolderUI.CARD_COUNT; idx++) {
            cardStyles[this.getCardClassName(idx)] = {
                position: {
                    x: positionStartPoint + (positionXShift * idx),
                    // y: 600
                },
                textureId: `${this.getCardTextureId(idx)}.png`,
                scale: { x: 0.35, y: 0.35 },
                interactive: true
            };
        }

        return [cardStyles];
    }

    private getCardId (cardIndex: number, suit: string = 'c'): string {
        return `card_a_${suit}${cardIndex}_large`;
    }

    private getCardTextureId (cardIndex: number, suit: string = 'c'): string {
        let cardName: string;
        switch (cardIndex) {
            case 11: cardName = TCardTypes.JACK; break;
            case 12: cardName = TCardTypes.QUEEN; break;
            case 13: cardName = TCardTypes.KING; break;
            case 14: cardName = TCardTypes.ACE; break;
            default: cardName = `${cardIndex}`;
        }

        return `card_a_${suit}${cardName}_large`;
    }

    private getCardClassName (cardIndex: number): string {
        return `card_style_${cardIndex}`;
    }

    protected onInit(startData?: any): void {
        this.alignCardHolder();

        for (let i = 0; i < CardsHolderUI.CARD_COUNT; i++) {
            let card = this.getElement(this.getCardId(i));
            card.on('pointerup', this._selectCard.bind(this, i));
        }
    }

    private _selectCard (eltIndex: number ,event: PIXI.interaction.InteractionEvent) {
        this._applyXIndexForElements(eltIndex);
        this.raizeElement(
            this.getElement(this.getCardId(eltIndex))
        );
    }

    private _applyXIndexForElements (elementIndex: number) {
        let element: PIXI.Sprite = this.getElement<PIXI.Sprite>(this.getCardId(elementIndex));
        let parent: PIXI.Container = element.parent;


        let counter = 0;
        while (counter <= CardsHolderUI.CARD_COUNT) {
            if (counter === elementIndex) {
                ui(element)
                    .zIndex(parent.children.length - 1);
            } else {
                ui(this.getElement(
                    this.getCardId(counter)
                )).zIndex(counter);
            }

            let elt: PIXI.Container = this.getElement(this.getCardId(counter));
            if (elt) {
                this.putDownElement(elt);
            }

            counter++;
        }
    }

    private raizeElement (element: PIXI.Container): void {
        if (!(element as any).___raized) {
            element.position.y = element.position.y - 10;
            (element as any).___raized = true;
        }
    }

    private putDownElement (element: PIXI.Container): void {
        if ((element as any).___raized) {
            element.position.y = element.position.y + 10;
            (element as any).___raized = false;
        }
    }

    private alignCardHolder (): void {
        let cardHolder: PIXI.Container = this.getElement<PIXI.Container>('PlayerCardsHolder');
        if (cardHolder) {
            ui(cardHolder)
                .size('100%')
                .position('bottom', 10)
                .position('left', -15)
        }
    }

    onResize(gameSize: IGameSize) {
        this.alignCardHolder();
    }
}
