import { UIComponent } from "../../../game.core/game.classes/ui.component";
import { TestUI } from "../background.notifications";

export class BackgroundTestUI extends UIComponent {
    prepareUI () {
        this.sendNotificationToMediator(TestUI, 'and test notifications');
    }
}
