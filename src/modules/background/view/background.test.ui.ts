import { UIComponent } from "../../../game.core/game.classes/ui.component";
import { TestUI } from "../background.notifications";
import {BackgroundNestedTestUi} from "./background.nested.test.ui";
import {UIEvent} from "../../../game.core/game.classes/ui.event";
import Container = PIXI.Container;
import {IElementTemplate, IGameStyle} from "../../../game.core/common.interfaces/game.ui";

export class BackgroundTestUI extends UIComponent {
    async prepareUI (): Promise<Container> {
        let nestedUI = new BackgroundNestedTestUi(this.rootStage, this.eventContextKey);
        nestedUI.initUIComponent();
        nestedUI.on('test', (event: UIEvent<string>) => {
            console.log(event.getData());
        });

        return new PIXI.Container();

        // setTimeout(() => {
        //     this.publish('test', 'Hi i\'m test event');
        // });
        // this.sendNotificationToMediator(TestUI, 'and test notifications');
    }

    protected render(element: PIXI.Container, startData?: any): void {
        // super.render(element, startData);
    }

    protected _layout(): IElementTemplate {
        return undefined;
    }

    protected _styles(): IGameStyle[] {
        return [];
    }
}
