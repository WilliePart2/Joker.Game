import { GameModule } from "../../../game.core/game.classes/game.module";
import { EnterToGame } from "../game.flow.notifications";
import { EnterToGameCommand } from "./enter.to.game.command";
// import { SubscribeToGameStateSource } from "../game.flow.notifications";
// import { SubscribeToGameStateSourceCommand } from "../../server.communication/controllers/subscribe.to.game.state.source.command";

export class GameFlowStartupCommand extends GameModule {
    async execute(notification: any): Promise<any> {
        super.execute(notification);

        this.facade().sendNotification(EnterToGame);
    }

    registerCommands () {
        // this.facade().registerCommand(SubscribeToGameStateSource, SubscribeToGameStateSourceCommand);
        this.facade().registerCommand(EnterToGame, EnterToGameCommand);
    }
}
