import { GameModule } from "../../../game.core/game.classes/game.module";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IGameInitData } from "../../../game.core/common.interfaces/game.data";
import { CardDeckMediator } from "../view/card.deck.mediator";

export class CardDeckStartupCommand extends GameModule {
    registerMediators(notification: Notification<IGameInitData>) {
        let initData: IGameInitData = notification.body;
        let rootStage: PIXI.Container = initData.stage;

        let mediator: CardDeckMediator = new CardDeckMediator(this.facadeKey, rootStage);
        this.facade().registerMediator(CardDeckMediator.NAME, mediator);

        mediator.showCardDeck();
    }
}
