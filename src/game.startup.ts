import {IGameInitData, IGameStartupData} from "./game.core/common.interfaces/game.data";
import {Facade} from "../PureMVCMulticore/core/pureMVC/facade/Facade";
import {Command} from "../PureMVCMulticore/core/pureMVC/command/Command";
import {Notification} from "../PureMVCMulticore/core/pureMVC/notification/Notification";
import {GameStartupCommand} from "./game/controllers/game.startup.command";
import {
    BackgroundModule,
    Compiler,
    MainGameModule,
    ResourceLoaderModule,
    RoomModule
} from "./module.names";
import {BackgroundStartupCommand} from "./modules/background/controllers/background.startup.command";
import {RoomStartupCommand} from "./modules/Room/controllers/room.startup.command";
import {ResourceManagerStartupCommand} from "./modules/resource.manager/controllers/resource.manager.startup.command";
import {CompilerStartupCommand} from "./modules/compiler/controllers/compiler.startup.command";

export class StartupGame {
    constructor (gameInitData: IGameStartupData) {
        this.startup(gameInitData);
    }

    async startup (gameInitData: IGameStartupData) {
        let initData: IGameInitData = await this.startupGame(gameInitData);
        this.startupMainGameModules(initData);
    }

    async startupGame (initData: IGameStartupData): Promise<IGameInitData> {
        let gameInitData: IGameInitData = await this.startupModule(MainGameModule, GameStartupCommand, initData);
        await this.startupModule(ResourceLoaderModule, ResourceManagerStartupCommand, initData);
        await this.startupModule(Compiler, CompilerStartupCommand);

        return gameInitData;
    }

    startupMainGameModules (gameInitData: IGameInitData) {
        this.startupModule(BackgroundModule, BackgroundStartupCommand, gameInitData);
        this.startupModule(RoomModule, RoomStartupCommand, gameInitData);
    }

    startupModule <T>(moduleNotification: Notification<any>, moduleCommandRef: Function, initialData?: T): Promise<any> {
        let module: Facade = Facade.getInstance(moduleNotification.name),
            startupCommandNotification: Notification<T> = Notification.getInstance<T>(`module_startup_${moduleNotification.name}`);
        module.registerCommand(startupCommandNotification, moduleCommandRef as typeof Command);
        return module.sendNotification(startupCommandNotification, initialData);
    }
}
