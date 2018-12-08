import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IDeclarationForStyleCompiler} from "../../../game.core/common.interfaces/game.ui";

export class CompileStyleCommand extends BaseCommand {
    async execute(notification: Notification<IDeclarationForStyleCompiler>): Promise<PIXI.Container> {
        return super.execute(notification);
    }
}
