import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData} from "../../../game.core/common.interfaces/game.data";
import {PixiClassesMapping} from "../../../game.core/pixi.classes.mapping";
import {BGAssets} from "../view/assets.mapping";
import Container = PIXI.Container;

export class InitBackgroundCommand extends BaseCommand {

    async execute(notification: Notification<IGameInitData>): Promise<any> {
        super.execute(notification);

        /**
         * Don't do that!
         */
        let data: IGameInitData = notification.body,
            _ = PixiClassesMapping.getInstance(),
            stage: Container = data.stage,
            background = new _.Sprite(_.TextureCache[BGAssets.RoomDB]);

            stage.addChild(background);
    }
}
