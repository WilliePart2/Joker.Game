import { GameMediator } from "../../../game.core/game.classes/game.mediator";
import { TPlayerPlaces } from "../../../ui.names";
import { PlayerPlaceUI } from "./ui/player.place.ui";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { SharedOnGameResize } from "../../../shared.notifications/shared.environment.notification";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";

export class PlayerPlacesMediator extends GameMediator {
    static NAME = 'PLAYER_PLACE_MEDIATOR';

    onInit(): void {
        this.registerUI(TPlayerPlaces.PLAYER_PLACE, PlayerPlaceUI);
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
        }
    }

    onResize (gameSize: IGameSize): void {
        this.getUI(TPlayerPlaces.PLAYER_PLACE).onResize(gameSize);
    }

    async showPlayers () {
        await this.createUIComponent(TPlayerPlaces.PLAYER_PLACE);
    }
}
