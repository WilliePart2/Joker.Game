import { GameModule } from "../../../game.core/game.classes/game.module";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";
import { IGameInitData } from "../../../game.core/common.interfaces/game.data";
import { PlayerPlacesMediator } from "../view/player.places.mediator";
import { initRoom } from "../../Room/Room.notification";

export class PlayerPlacesStartupCommand extends GameModule {
    registerMediators(notification: Notification<IGameInitData>) {
        let initData: IGameInitData = notification.body;
        let stage = initData.stage;

        let mediator: PlayerPlacesMediator = new PlayerPlacesMediator(this.facadeKey, stage);
        this.facade().registerMediator(PlayerPlacesMediator.NAME, mediator);
        mediator.showPlayers();
    }
}
