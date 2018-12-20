import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IGameSize } from "../../../game.core/common.interfaces/game.environment";
import { EnvironmentService } from "../model/environment.service";

export class ResizeGameRendererCommand extends BaseCommand {
    async execute(notification: Notification<IGameSize>): Promise<any> {
        let nBody: IGameSize = notification.body;
        let envService: EnvironmentService = this.facade().retrieveProxy(EnvironmentService.NAME) as EnvironmentService;
        let gameApplication: PIXI.Application = envService.getGameApplication();
        gameApplication.renderer.resize(nBody.gameWidth, nBody.gameHeight);

    }
}
