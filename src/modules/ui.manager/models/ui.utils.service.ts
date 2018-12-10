import { IExtendedContainer, IGameStyleSheet } from "../../../game.core/common.interfaces/game.ui";
import { Proxy } from "../../../../PureMVCMulticore/core/pureMVC/Proxy";
import { SharedRecompileStyles } from "../../../shared.notifications/shared.compiler.notification";

export class UIUtilsService extends Proxy {
    static NAME = 'UIUtilsService';

    async addClassToElement (element: IExtendedContainer, className: string, styles: IGameStyleSheet[]): Promise<void> {
        if (!this.checkIsClassExists(element, className)) {
            element.classList = `${element.classList ? element.classList.trim() : ''} ${className}`;
            await this.sendNotificationToAll(SharedRecompileStyles, {element: element, styles: styles});
        }
    }

    private checkIsClassExists (element: IExtendedContainer, className: string): boolean {
        let classList: string[] = element.classList.split(' ')
            .filter((ownClassName: string) => ownClassName.trim() === className);
            
        return !!classList.length
    }

    async removeClassFromElement (element: IExtendedContainer, className: string, styles: IGameStyleSheet[]): Promise<void> {
        if (this.checkIsClassExists(element, className)) {
            this.removeClassFromClassList(element, className);
            await this.sendNotificationToAll(SharedRecompileStyles, {element, styles});
        }
    }

    private removeClassFromClassList (element: IExtendedContainer, className: string): void {
        if (element.classList) {
        element.classList = element.classList.trim()
            .split(' ')
            .filter((ownClassName: string) => ownClassName.trim() !== className)
            .join(' ');
        }
    }
}
