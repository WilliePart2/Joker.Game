import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData} from "../../../game.core/common.interfaces/game.data";
import * as PIXI from 'pixi.js';

export class InitBackgroundCommand extends BaseCommand {

    async execute(notification: Notification<IGameInitData>): Promise<any> {
        super.execute(notification);

        /**
         * Don't do that!
         */
        let data: IGameInitData = notification.body,
            stage: PIXI.Container = data.stage,
            background: PIXI.Sprite = null,
            pathToImg: string = 'assets/img/roomBackground.png';

        PIXI.loader.add(pathToImg)
            .load(() => {
                background = new PIXI.Sprite(PIXI.utils.TextureCache[pathToImg])
                stage.addChild(background);
            });

    }
}
