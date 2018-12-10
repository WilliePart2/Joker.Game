import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IUIRemoveClassStatement, IExtendedContainer, IGameStyleSheet } from "../../../game.core/common.interfaces/game.ui";
import { UIUtilsService } from "../models/ui.utils.service";

export class RemoveUIClassCommand extends BaseCommand {
    async execute (notification: Notification<IUIRemoveClassStatement>) {
        let nBody: IUIRemoveClassStatement = notification.body,
            element: IExtendedContainer = nBody.element,
            styles: IGameStyleSheet[] = nBody.payload.styles,
            className: string = nBody.payload.className,
            computationService: UIUtilsService = this.facade().retrieveProxy(UIUtilsService.NAME) as UIUtilsService;

        await computationService.removeClassFromElement(element, className, styles);
    }
}