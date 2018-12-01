import {GameModule} from "../../../game.core/game.classes/game.module";
import {initRoom, InitRoomPlace} from "../Room.notification";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {IGameInitData} from "../../../game.core/common.interfaces/game.data";
import {InitRoomPlaceCommand} from "./init.room.place.command";
import {InitRoomCommand} from "./init.room.commad";

export class RoomStartupCommand extends GameModule {
    async execute(notification: Notification<IGameInitData>): Promise<any> {
        super.execute(notification);

        this.facade().sendNotification(initRoom, notification.body);
    }


    registerCommands() {
        this.facade().registerCommand(initRoom,InitRoomCommand);
        this.facade().registerCommand(InitRoomPlace,InitRoomPlaceCommand);
    }
}