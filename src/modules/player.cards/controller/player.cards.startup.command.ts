import { GameModule } from "../../../game.core/game.classes/game.module";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IGameInitData } from "../../../game.core/common.interfaces/game.data";
import { PlayerCardsMediator } from "../view/player.cards.mediator";

export class PlayerCardsStartupCommand extends GameModule {
    registerMediators(notification: Notification<IGameInitData>) {
        let initData: IGameInitData = notification.body;
        let rootStage: PIXI.Container = initData.stage;

        let mediator = new PlayerCardsMediator(this.facadeKey, rootStage);
        this.facade().registerMediator(PlayerCardsMediator.PLAYER_CARDS_MEDIATOR, mediator);
        mediator.showCards();
    }
}
