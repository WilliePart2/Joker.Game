import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IDeclarationForCompiler, IElementTemplate, IGameStyle} from "../../../game.core/common.interfaces/game.ui";
import {CompileLayout, CompileStyles} from "../compiler.notifications";

export class CompileElementCommand extends BaseCommand {
    async execute(notification: Notification<IDeclarationForCompiler>): Promise<PIXI.Container> {
        let nBody: IDeclarationForCompiler = notification.body,
            layout: IElementTemplate = nBody.layout,
            styles: IGameStyle[] = nBody.styles;

        let compiledElement = await this.facade().sendNotification(CompileLayout, layout);
        if (styles && Array.isArray(styles) && styles.length) {
            let elementWithStyles = await this.facade().sendNotification(CompileStyles, {
                element: compiledElement,
                styles: styles
            });
            return elementWithStyles;
        }

        return compiledElement;
    }
}
