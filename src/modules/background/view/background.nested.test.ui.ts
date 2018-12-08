import {UIComponent} from "../../../game.core/game.classes/ui.component";
import {IElementTemplate, IGameStyle} from "../../../game.core/common.interfaces/game.ui";

export class BackgroundNestedTestUi extends UIComponent {
    onInit () {
        setTimeout(() => this.publish('test', 'Nested event =)'));
    }


    protected async prepareUI(startData?: any): Promise<PIXI.Container> {
        // return super.prepareUI(startData);
        return new PIXI.Container();
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
