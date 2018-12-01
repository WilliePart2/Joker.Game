import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IRoomInitdataPlace} from "../../../game.core/common.interfaces/game.data";

export class InitRoomPlaceCommand extends BaseCommand{

    async execute(notification: Notification<IRoomInitdataPlace>): Promise<any> {
        super.execute(notification);

        let data : IRoomInitdataPlace = notification.body,
            Container : PIXI.Container = data.stage,
            Sprite: PIXI.Sprite = data.PlaceSprite;

        Container.addChild(Sprite);

    }
}