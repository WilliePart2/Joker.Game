import {BaseCommand} from "../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {INotification} from "../../../PureMVCMulticore/core/pureMVC/interfaces/INotification";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData} from "../../game.core/common.interfaces/game.data";
import {GameModule} from "../../game.core/game.classes/game.module";

/**
 * В этой команде мы стартуем наши модуля и передает им данные для инициализации.
 * В частности PIXI.Container
 */
export class GameStartupModulesCommand extends GameModule {
    async execute(notification: Notification<IGameInitData>): Promise<any> {
        super.execute(notification);

        let initData: IGameInitData = notification.body;

    }

    registerCommands () {

    }
}
