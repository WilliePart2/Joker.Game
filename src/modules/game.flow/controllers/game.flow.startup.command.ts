import { GameModule } from "../../../game.core/game.classes/game.module";
// import { SubscribeToGameStateSource } from "../game.flow.notifications";
// import { SubscribeToGameStateSourceCommand } from "../../server.communication/controllers/subscribe.to.game.state.source.command";

export class GameFlowStartupCommand extends GameModule {
    registerCommands () {
        // this.facade().registerCommand(SubscribeToGameStateSource, SubscribeToGameStateSourceCommand);
    }
}
