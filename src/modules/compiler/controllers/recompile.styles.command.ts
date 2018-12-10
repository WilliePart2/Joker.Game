import { BaseCommand } from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { IDeclarationForCompiler, IExtendedContainer, IDeclarationForStyleCompiler, IGameStyleSheet } from "../../../game.core/common.interfaces/game.ui";
import { StyleCompilerService } from "../model/style.compiler.service";

export class RecompileStylesCommand extends BaseCommand {
    async execute (notification: Notification<IDeclarationForStyleCompiler>): Promise<void> {
        let nBody = notification.body,
            styleCompiler: StyleCompilerService = this.facade().retrieveProxy(StyleCompilerService.NAME) as StyleCompilerService,
            element: IExtendedContainer = nBody.element,
            styles: IGameStyleSheet[] = nBody.styles;
        
        await styleCompiler.compile(element, styles);
    }
}
