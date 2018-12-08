import {UIComponent} from "../../../game.core/game.classes/ui.component";

export class BackgroundNestedTestUi extends UIComponent {
    onInit () {
        setTimeout(() => this.publish('test', 'Nested event =)'));
    }
}
