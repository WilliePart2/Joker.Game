import {Mediator} from "../../../PureMVCMulticore/core/pureMVC/mediator/Mediator";
import {IRoomInitData} from "../../game.core/common.interfaces/game.data";
import {RoomCreator} from "../game.main.module.notifications";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";

export class GameRoomMediator extends Mediator{
    static NAME = "ROOM_MEDIATOR";

    createRoomRender(RoomInitData: IRoomInitData){
        //get application
        //set sprites
        //logic render room!!
    }


    listNotificationInterests(): Notification<any>[] {
        return [
          RoomCreator
        ];
    }

    async handleNotification(notification: Notification<any>): Promise<any> {
        switch (notification.name){
            case RoomCreator.name:
                this.createRoomRender(notification.body);
                break;
        }
    }
}