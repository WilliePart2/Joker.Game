import {GameModule} from "../../game.core/game.classes/game.module";
import {IRoomInitData} from "../../game.core/common.interfaces/game.data";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {CreateRoomCommand} from "./create.room.command";
import {RoomCreator} from "../game.main.module.notifications";

export class GameStartupRoomCommad extends GameModule {

    execute(notification: Notification<IRoomInitData>): any {
        let RoomData: IRoomInitData = notification.body;
        super.execute(RoomData);

        this.facade().sendNotification(CreateRoomCommand, RoomData);
    }

    registerCommands() {
        this.facade().registerCommand(CreateRoomCommand, RoomCreator);
    }
}