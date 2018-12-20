import { GameMediator } from "../../../game.core/game.classes/game.mediator";
import { TPlayerCardsUI } from "../../../ui.names";
import { CardsHolderUI } from "./ui/cards.holder.ui";
import { UIComponent } from "../../../game.core/game.classes/ui.component";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { SharedOnGameResize } from "../../../shared.notifications/shared.environment.notification";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";

export class PlayerCardsMediator extends GameMediator {
    static PLAYER_CARDS_MEDIATOR = 'PLAYER_CARDS_MEDIATOR';

    onInit(): void {
        super.onInit();
        this.registerUI(TPlayerCardsUI.CARD_HOLDER, CardsHolderUI);
    }

    async showCards (): Promise<void> {
        await this.createUIComponent(TPlayerCardsUI.CARD_HOLDER);
    }

    listNotificationInterests(): Notification<any>[] {
        return [
            SharedOnGameResize
        ];
    }

    async handleNotification(notification: Notification<any>): Promise<any> {
        switch (notification.name) {
            case SharedOnGameResize.name:
                this.onResize(notification.body as IGameSize);
                break;
        }
    }

    onResize (gameSize: IGameSize): void {
        this.getUI(TPlayerCardsUI.CARD_HOLDER).onResize(gameSize);
    }
}
