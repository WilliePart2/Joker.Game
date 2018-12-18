import { GameModule } from "../../../game.core/game.classes/game.module";
import { SharedShowGenericErrorMessage } from "../../../shared.notifications/shared.mtc.notifications";
import { ShowGenericErrorMessageCommand } from "./show.generic.error.message.command";

export class MtcStartupCommand extends GameModule {
    registerCommands () {
        this.facade().registerCommand(SharedShowGenericErrorMessage, ShowGenericErrorMessageCommand);
    }
}
