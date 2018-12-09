import {GameModule} from "../../../game.core/game.classes/game.module";
import {InitBackground} from "../background.notifications";
import {InitBackgroundCommand} from "./init.background.command";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData} from "../../../game.core/common.interfaces/game.data";
import { BackgroundMediator } from "../view/background.mediator";
import { Container } from "pixi.js";

export class BackgroundStartupCommand extends GameModule {
    async execute(notification: Notification<IGameInitData>): Promise<any> {
        super.execute(notification);

        this.facade().sendNotification(InitBackground, notification.body);
    }

    registerCommands (): void {
        // this.facade().registerCommand(InitBackground, InitBackgroundCommand);
    }

    registerMediators (initNotification: Notification<IGameInitData>): void {
        let initData: IGameInitData = initNotification.body,
            rootStage: Container = initData.stage;
        this.facade().registerMediator(BackgroundMediator.NAME, new BackgroundMediator(this.facadeKey, rootStage));
    }
}
