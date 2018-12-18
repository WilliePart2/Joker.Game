import {IGameInitData, IGameStartupData} from "./game.core/common.interfaces/game.data";
import {Facade} from "../PureMVCMulticore/core/pureMVC/facade/Facade";
import {Command} from "../PureMVCMulticore/core/pureMVC/command/Command";
import {Notification} from "../PureMVCMulticore/core/pureMVC/notification/Notification";
import {GameStartupCommand} from "./game/controllers/game.startup.command";
import {
    BackgroundModule,
    Compiler, Environment, GameFlowModule,
    MainGameModule, MTCModule,
    ResourceLoaderModule,
    RoomModule, ServerCommunicationModule,
    UIManager
} from "./module.names";
import {BackgroundStartupCommand} from "./modules/background/controllers/background.startup.command";
import {RoomStartupCommand} from "./modules/Room/controllers/room.startup.command";
import {ResourceManagerStartupCommand} from "./modules/resource.manager/controllers/resource.manager.startup.command";
import {CompilerStartupCommand} from "./modules/compiler/controllers/compiler.startup.command";
import { UIManagerStartupCommand } from "./modules/ui.manager/controllers/ui.manager.startup.command";
import {EnvironmentSturtupCommand} from "./modules/environment/controllers/environment.sturtup.command";
import { ServerCommunicationStartupCommand } from "./modules/server.communication/controllers/server.communication.startup.command";
import { GameFlowStartupCommand } from "./modules/game.flow/controllers/game.flow.startup.command";
import { MtcStartupCommand } from "./modules/mtc/controllers/mtc.startup.command";

export class StartupGame {
    constructor (gameInitData: IGameStartupData) {
        this.startup(gameInitData);
    }

    async startup (gameInitData: IGameStartupData) {
        let initData: IGameInitData = await this.startupGame(gameInitData);
        this.startupMainGameModules(initData);
    }

    async startupGame (initData: IGameStartupData): Promise<IGameInitData> {
        await this.startupModule(Environment, EnvironmentSturtupCommand, initData);
        let gameInitData: IGameInitData = await this.startupModule(MainGameModule, GameStartupCommand, initData);
        await this.startupModule(ResourceLoaderModule, ResourceManagerStartupCommand, initData);
        await this.startupModule(Compiler, CompilerStartupCommand);
        await this.startupModule(UIManager, UIManagerStartupCommand, initData);
        await this.startupModule(ServerCommunicationModule, ServerCommunicationStartupCommand);
        await this.startupModule(GameFlowModule, GameFlowStartupCommand);
        await this.startupModule(MTCModule, MtcStartupCommand, gameInitData);

        return gameInitData;
    }

    startupMainGameModules (gameInitData: IGameInitData) {
        this.startupModule(BackgroundModule, BackgroundStartupCommand, gameInitData);
        this.startupModule(RoomModule, RoomStartupCommand, gameInitData);
    }

    startupModule <T extends Notification<any>>(moduleNotification: T, moduleCommandRef: Function, initialData?: T[keyof T]): Promise<any> {
        let module: Facade = Facade.getInstance(moduleNotification.name),
            startupCommandNotification: Notification<T> = Notification.getInstance<T>(`module_startup_${moduleNotification.name}`);
        module.registerCommand(startupCommandNotification, moduleCommandRef as typeof Command);
        return module.sendNotification(startupCommandNotification, initialData as any);
    }
}
