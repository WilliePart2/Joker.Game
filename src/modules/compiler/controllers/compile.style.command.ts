import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {
    IDeclarationForStyleCompiler,
    IExtendedContainer,
    IGameStyleSheet
} from "../../../game.core/common.interfaces/game.ui";
import {StyleCompilerService} from "../model/style.compiler.service";

export class CompileStyleCommand extends BaseCommand {
    async execute(notification: Notification<IDeclarationForStyleCompiler>): Promise<PIXI.Container> {
        let nBody: IDeclarationForStyleCompiler = notification.body,
            element: IExtendedContainer = nBody.element,
            stylesForCompilation: IGameStyleSheet[] = nBody.styles,
            styleCompiler: StyleCompilerService = this.facade().retrieveProxy(StyleCompilerService.NAME) as StyleCompilerService,
            elementWithStyles = await styleCompiler.compile(element, stylesForCompilation);

        return elementWithStyles;
    }
}
