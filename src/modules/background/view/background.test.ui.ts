import { UIComponent } from "../../../game.core/game.classes/ui.component";
import { TestUI } from "../background.notifications";
import {BackgroundNestedTestUi} from "./background.nested.test.ui";
import {UIEvent} from "../../../game.core/game.classes/ui.event";

export class BackgroundTestUI extends UIComponent {
    prepareUI () {
        let nestedUI = new BackgroundNestedTestUi(this.rootStage, this.eventContextKey);
        nestedUI.initUIComponent();
        nestedUI.on('test', (event: UIEvent<string>) => {
            console.log(event.getData());
        });

        // setTimeout(() => {
        //     this.publish('test', 'Hi i\'m test event');
        // });
        // this.sendNotificationToMediator(TestUI, 'and test notifications');
    }
}
