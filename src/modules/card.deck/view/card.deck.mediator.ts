import { GameMediator } from "../../../game.core/game.classes/game.mediator";
import { TCardDeck } from "../../../ui.names";
import { CardDeckUI } from "./ui/card.deck.ui";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { SharedOnGameResize } from "../../../shared.notifications/shared.environment.notification";

export class CardDeckMediator extends GameMediator {
    static NAME = 'CARD_DECK_MEDIATOR';

    onInit(): void {
        this.registerUI(TCardDeck.CARD_DECK, CardDeckUI);
    }

    showCardDeck () {
        this.createUIComponent(TCardDeck.CARD_DECK);
    }

    onResize (gameSize: IGameSize) {
        this.getUI(TCardDeck.CARD_DECK).onResize(gameSize);
    }

    listNotificationInterests(): Notification<any>[] {
        return [
            SharedOnGameResize
        ];
    }

    async handleNotification(notification: Notification<any>): Promise<any> {
        switch (notification.name) {
            case notification.name:
                this.onResize(notification.body as IGameSize);
                break;
        }
    }
}
