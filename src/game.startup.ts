import {IGameInitData} from "./game.core/common.interfaces/game.data";
import {Facade} from "../PureMVCMulticore/core/pureMVC/facade/Facade";
import {Command} from "../PureMVCMulticore/core/pureMVC/command/Command";
import {Notification} from "../PureMVCMulticore/core/pureMVC/notification/Notification";
import {MainGameModule} from "./CNotifications";
import {GameStartupCommand} from "./game/controllers/game.startup.command";

export class StartupGame {
    constructor (gameInitData: IGameInitData) {
        let _fillInitData = {...gameInitData, containerId: 'gameContainer'};
        this.startupGame(_fillInitData);
        this.startupMainGameModules();
    }

    startupGame (initData: IGameInitData) {
        this.startupModule(MainGameModule, GameStartupCommand, initData);
    }

    startupMainGameModules () {

    }

    startupModule <T>(moduleNotification: Notification<any>, moduleCommandRef: Function, initialData?: T): Promise<any> {
        let module: Facade = Facade.getInstance(moduleNotification.name),
            startupCommandNotification: Notification<T> = Notification.getInstance<T>(`module_startup_${moduleNotification.name}`);
        module.registerCommand(startupCommandNotification, moduleCommandRef as typeof Command);
        return module.sendNotification(startupCommandNotification, initialData);
    }
}
