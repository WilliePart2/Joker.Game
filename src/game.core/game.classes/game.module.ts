import {BaseCommand} from "../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";

export class GameModule extends BaseCommand {
    execute(notification: any): any {
        this.registerCommands();
        this.registerMediators(notification);
        this.registerProxies(notification);
    }

    registerCommands () {

    }

    registerMediators (arg: any) {

    }

    registerProxies (arg: any) {

    }
}