import {GameModule} from "../../game.core/game.classes/game.module";
import {IGameInitData, IGameStartupData} from "../../game.core/common.interfaces/game.data";
import { MountGameRenderer, StartupMainModules, TriggerOnGameInit } from "../game.main.module.notifications";
import {MountGameRendererCommand} from "./mount.game.renderer.command";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {GameAreaMediator} from "../view/game.area.mediator";
import {GameStartupModulesCommand} from "./game.startup.modules.command";
import { TriggerOnGameInitCommand } from "./trigger.on.game.init.command";

export class GameStartupCommand extends GameModule {
    async execute(gameInitData: Notification<IGameStartupData>): Promise<IGameInitData> {
        super.execute(gameInitData);

        let initData: IGameStartupData = gameInitData.body;
        let gameInit: IGameInitData = await this.facade().sendNotification(MountGameRenderer, initData);
        return gameInit;
    }

    registerCommands () {
        this.facade().registerCommand(MountGameRenderer, MountGameRendererCommand);
        this.facade().registerCommand(StartupMainModules, GameStartupModulesCommand);
        this.facade().registerCommand(TriggerOnGameInit, TriggerOnGameInitCommand);
    }

    registerMediators () {
        this.facade().registerMediator(GameAreaMediator.NAME, new GameAreaMediator(this.facadeKey));
    }
}
