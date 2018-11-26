import {GameModule} from "../../game.core/game.classes/game.module";
import {IGameInitData} from "../../game.core/common.interfaces/game.data";
import {MountGameRenderer} from "../game.main.module.notifications";
import {MountGameRendererCommand} from "./mount.game.renderer.command";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {GameAreaMediator} from "../view/game.area.mediator";

export class GameStartupCommand extends GameModule {
    execute(gameInitData: Notification<IGameInitData>): any {
        let initData: IGameInitData = gameInitData.body;
        super.execute(gameInitData);

        this.facade().sendNotification(MountGameRenderer, initData);
    }

    registerCommands () {
        this.facade().registerCommand(MountGameRenderer, MountGameRendererCommand);
    ``}

    registerMediators () {
        this.facade().registerMediator(GameAreaMediator.NAME, new GameAreaMediator(this.facadeKey));
    }
}
