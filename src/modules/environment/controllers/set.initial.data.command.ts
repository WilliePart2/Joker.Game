import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { EnvironmentService } from "../model/environment.service";
import { IGameInitData } from "../../../game.core/common.interfaces/game.data";

export class SetInitialDataCommand extends BaseCommand {
    async execute(notification: Notification<IGameInitData>): Promise<any> {
        let nBody: IGameInitData = notification.body;
        let envService: EnvironmentService = this.facade().retrieveProxy(EnvironmentService.NAME) as EnvironmentService;
        envService.setGameAreaData(nBody);
    }
}
