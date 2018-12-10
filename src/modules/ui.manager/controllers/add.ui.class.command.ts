import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IUIAddClassStatement, IExtendedContainer, IGameStyleSheet } from "../../../game.core/common.interfaces/game.ui";
import { UIUtilsService } from "../models/ui.utils.service";

export class AddUIClassCommand extends BaseCommand {
    async execute (notification: Notification<IUIAddClassStatement>) {
        let nBody: IUIAddClassStatement = notification.body,
            element: IExtendedContainer = nBody.element,
            className: string = nBody.payload.className,
            styles: IGameStyleSheet[] = nBody.payload.styles,
            computationService: UIUtilsService = this.facade().retrieveProxy(UIUtilsService.NAME) as UIUtilsService;

        await computationService.addClassToElement(element, className, styles);
    }
}
