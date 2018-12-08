import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IElementTemplate} from "../../../game.core/common.interfaces/game.ui";
import {LayoutCompilerService} from "../model/layout.compiler.service";
import {ICompiler} from "../compiler.interfaces";

export class CompileLayoutCommand extends BaseCommand{
    async execute(notification: Notification<IElementTemplate>): Promise<PIXI.Container> {
        let layoutCompiler: LayoutCompilerService = this.facade().retrieveProxy(LayoutCompilerService.NAME) as LayoutCompilerService;
        return layoutCompiler.compile(notification.body)
    }
}
