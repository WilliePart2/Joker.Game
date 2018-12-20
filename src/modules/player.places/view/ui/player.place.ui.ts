import { UIComponent } from "../../../../game.core/game.classes/ui.component";
import {
    IElementTemplate,
    IExtendedContainer,
    IGameStyle,
    IGameStyleSheet
} from "../../../../game.core/common.interfaces/game.ui";
import { IGameSize } from "../../../../game.core/common.interfaces/game.environment";
import { ui } from "../../../ui.manager/shortcuts/ui";
import { PlayerPlaceClassNames, PlayerPlaceNames } from "../../player.place.names";
import { TUIChain } from "../../../../zindex.ui.values";

export class PlayerPlaceUI extends UIComponent {
    static COUNT_PLAYER_PLACES = 3;

    protected _layout(): IElementTemplate {
        let places: IElementTemplate[] = [];

        for (let i = 0; i < PlayerPlaceUI.COUNT_PLAYER_PLACES; i++) {
            places.push({
                id: this._createPlayerPlaceId(i),
                elementType: PIXI.Sprite,
                classList: this._createPlayerPlaceClassName(i)
            });
        }

        return {
            id: 'PlayerPlacesContainer',
            elementType: PIXI.Container,
            children: places
        };
    }

    private _createPlayerPlaceId (placeId: number): string {
        return `PlayerPlace_${placeId}`;
    }

    private _createPlayerPlaceClassName (placeId: number): string {
        return `PlayerPlaceClass_${placeId}`;
    }

    protected _styles(): IGameStyleSheet[] {
        let placeStyles: IGameStyleSheet = {};

        for (let i = 0; i < PlayerPlaceUI.COUNT_PLAYER_PLACES; i++) {
            placeStyles[this._createPlayerPlaceClassName(i)] = {
                position: {x: i * 300},
                textureId: PlayerPlaceNames.PLAYER_PLACE_REGULAR,
                scale: { x: 0.6, y: 0.6 },
                cursor: 'pointer',
                interactive: true
            };
        }

        placeStyles[PlayerPlaceClassNames.PLACE_ACTIVE] = {
            textureId: PlayerPlaceNames.PLAYER_PLACE_ACTIVE
        };

        return [placeStyles];
    }

    protected onInit(startData?: any): void {
        let container: PIXI.Container = this.getElement<PIXI.Container>('PlayerPlacesContainer');
        let place1: PIXI.Sprite = this.getElement(this._createPlayerPlaceId(0));
        let place2: PIXI.Sprite = this.getElement(this._createPlayerPlaceId(1));
        let place3: PIXI.Sprite = this.getElement(this._createPlayerPlaceId(2));

        if (container) {
            ui(container)
                .zIndex(container.parent.children.length - 1);
        }

        if (place1) {
            ui(place1)
                .position('top', 10)
                .position('left', 10);

            place1.on('pointerover', (event: PIXI.interaction.InteractionEvent) => {
                this.addClass(place1 as IExtendedContainer, PlayerPlaceClassNames.PLACE_ACTIVE);
            });
            place1.on('pointerout', (event: PIXI.interaction.InteractionEvent) => {
                this.removeClass(place1 as IExtendedContainer, PlayerPlaceClassNames.PLACE_ACTIVE);
            });
        }
        if (place2) {
            ui(place2)
                .position('top', 10)
                .position('xCenter');

            place2.on('pointerover', (event: PIXI.interaction.InteractionEvent) => {
                this.addClass(place2 as IExtendedContainer, PlayerPlaceClassNames.PLACE_ACTIVE);
            });
            place2.on('pointerout', (event: PIXI.interaction.InteractionEvent) => {
                this.removeClass(place2 as IExtendedContainer, PlayerPlaceClassNames.PLACE_ACTIVE);
            });
        }
        if (place3) {
            ui(place3)
                .position('top', 10)
                .position('right', 10);

            place3.on('pointerover', (event: PIXI.interaction.InteractionEvent) => {
                this.addClass(place3 as IExtendedContainer, PlayerPlaceClassNames.PLACE_ACTIVE);
            });
            place3.on('pointerout', (event: PIXI.interaction.InteractionEvent) => {
                this.removeClass(place3 as IExtendedContainer, PlayerPlaceClassNames.PLACE_ACTIVE);
            });
        }
    }

    onResize(gameSize: IGameSize) {
        let place1: PIXI.Sprite = this.getElement(this._createPlayerPlaceId(0));
        let place2: PIXI.Sprite = this.getElement(this._createPlayerPlaceId(1));
        let place3: PIXI.Sprite = this.getElement(this._createPlayerPlaceId(2));

        if (place1) {
            ui(place1)
                .position('top', 10)
                .position('left', 10);
        }

        if (place2) {
            ui(place2)
                .position('top', 10)
                .position('xCenter');
        }

        if (place3) {
            ui(place3)
                .position('top', 10)
                .position('right', 10);
        }
    }
}
