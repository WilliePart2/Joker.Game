import {GameModule} from "../../../game.core/game.classes/game.module";
import {CompileLayout, CompileStyles} from "../compiler.notifications";
import {CompileLayoutCommand} from "./compile.layout.command";
import {CompileStyleCommand} from "./compile.style.command";
import {SharedCompileElement, SharedRecompileStyles} from "../../../shared.notifications/shared.compiler.notification";
import {CompileElementCommand} from "./compile.element.command";
import {LayoutCompilerService} from "../model/layout.compiler.service";
import {StyleCompilerService} from "../model/style.compiler.service";
import { RecompileStylesCommand } from "./recompile.styles.command";

export class CompilerStartupCommand extends GameModule {
    async execute(notification: any): Promise<any> {
        super.execute(notification)
            .then(() => this.registerSharedCommands())
    }

    registerCommands() {
        this.facade().registerCommand(CompileLayout, CompileLayoutCommand);
        this.facade().registerCommand(CompileStyles, CompileStyleCommand);
    }

    registerSharedCommands () {
        this.facade().registerCommand(SharedCompileElement, CompileElementCommand);
        this.facade().registerCommand(SharedRecompileStyles, RecompileStylesCommand);
    }

    registerProxies(arg: any) {
        this.facade().registerProxy(LayoutCompilerService.NAME, LayoutCompilerService);
        this.facade().registerProxy(StyleCompilerService.NAME, StyleCompilerService);
    }
}
