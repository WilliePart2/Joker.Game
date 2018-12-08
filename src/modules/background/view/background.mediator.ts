import { GameMediator } from "../../../game.core/game.classes/game.mediator";
import { BackgroundTestUI } from "./background.test.ui";
import {COMPILATION_TEST, TEST} from "./ui.names";
import { UIHandler } from "../../../game.core/game.decorators/ui.handler";
import { TestUI } from "../background.notifications";
import { Notification } from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import { TestShared } from "../../../shared.notifications/test.notifications";
import {UIComponent} from "../../../game.core/game.classes/ui.component";
import {UIEvent} from "../../../game.core/game.classes/ui.event";
import {BackgroundCompilationTestUI} from "./background.compilation.test.ui";

export class BackgroundMediator extends GameMediator {
    static NAME: string = 'BackgroundMediator';

    onInit (): void {
        this.registerUI(TEST, BackgroundTestUI);
        this.registerUI(COMPILATION_TEST, BackgroundCompilationTestUI);

        this.createUIComponent(COMPILATION_TEST);

        this.createUIComponent(TEST)
            .then(() => {
                this.addUIListeners();
            });
    }

    addUIListeners () {
        let testUI: UIComponent = this.getUI(TEST);
        testUI.on('test', () => console.log('Test UI created'));
        this.uiEventsContext().on('test', (event: UIEvent<string>) => {
            console.log(`Mediator handler: ${event.getData()}`);
        });
    }

    // @UIHandler(TestUI)
    // testUIPolling (notification: Notification<any>) {
    //     console.log(notification.name, notification.body);
    // }

    testSharedHandling (notification: Notification<string>) {
        console.log(notification.name);
    }

    async handleNotification(notification: Notification<any>): Promise<any> {
        let nName: string = notification.name;

        switch (nName) {
            case TestShared.name:
                this.testSharedHandling(notification);
        }
    }

    listNotificationInterests(): Notification<any>[] {
        return [
            TestShared
        ];
    }
}
