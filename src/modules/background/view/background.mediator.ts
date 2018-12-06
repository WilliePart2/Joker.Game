import { GameMediator } from "../../../game.core/game.classes/game.mediator";
import { BackgroundTestUI } from "./background.test.ui";
import { TEST } from "./ui.names";
import { UIHandler } from "../../../game.core/game.decorators/ui.handler";
import { TestUI } from "../background.notifications";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { Handler } from "../../../../PureMVCMulticore/core/pureMVC/decorators/handler";
import { TestShared } from "../../../shared.notifications/test.notifications";

export class BackgroundMediator extends GameMediator {
    static NAME: string = 'BackgroundMediator';

    init (): void {
        this.registerUI(TEST, BackgroundTestUI)

        this.createUIComponent(TEST);
    }

    @UIHandler(TestUI)
    testUIPolling (notification: Notification<any>) {
        console.log(notification.name, notification.body);
    }

    @Handler(TestShared)
    testSharedHandling (notification: Notification<string>) {
        console.log(notification.body);
    }
}
