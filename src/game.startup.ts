import {IGameInitData, IGameStartupData} from "./game.core/common.interfaces/game.data";
import {Facade} from "../PureMVCMulticore/core/pureMVC/facade/Facade";
import {Command} from "../PureMVCMulticore/core/pureMVC/command/Command";
import {Notification} from "../PureMVCMulticore/core/pureMVC/notification/Notification";
import {GameStartupCommand} from "./game/controllers/game.startup.command";
import {MainGameModule} from "./module.names";

export class StartupGame {
    constructor (gameInitData: IGameStartupData) {
        this.startup(gameInitData);
    }

    async startup (gameInitData: IGameStartupData) {
        let initData: IGameInitData = await this.startupGame(gameInitData);
        this.startupMainGameModules(initData);
    }

    async startupGame (initData: IGameStartupData) {
        return await this.startupModule(MainGameModule, GameStartupCommand, initData);
    }

    startupMainGameModules (gameInitData: IGameInitData) {

    }

    startupModule <T>(moduleNotification: Notification<any>, moduleCommandRef: Function, initialData?: T): Promise<any> {
        let module: Facade = Facade.getInstance(moduleNotification.name),
            startupCommandNotification: Notification<T> = Notification.getInstance<T>(`module_startup_${moduleNotification.name}`);
        module.registerCommand(startupCommandNotification, moduleCommandRef as typeof Command);
        return module.sendNotification(startupCommandNotification, initialData);
    }
}
