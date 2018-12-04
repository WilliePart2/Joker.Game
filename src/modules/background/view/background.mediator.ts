import { GameMediator } from "../../../game.core/game.classes/game.mediator";
import { BackgroundTestUI } from "./background.test.ui";
import { TEST } from "./ui.names";
import { handler } from "../../../game.core/game.decorators/handler";
import { TestUI } from "../background.notifications";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";

export class BackgroundMediator extends GameMediator {
    onRegister () {
        this.registerUI(TEST, BackgroundTestUI)
    }

    @handler(TestUI)
    createdUI (notification: Notification<any>) {
        console.log(notification.name, notification.body);
    }
}
