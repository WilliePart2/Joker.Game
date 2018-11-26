import {BaseCommand} from "../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {IRoomCreator, IRoomInitData} from "../../game.core/common.interfaces/game.data";
import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {RoomCreator} from "../game.main.module.notifications";

export class CreateRoomCommand extends BaseCommand {

    async execute(notification: Notification<IRoomInitData>): Promise<any> {
        let Room: IRoomInitData = notification.body,
            RoomContainer = document.getElementById(Room.container),

            RoomSetting: IRoomCreator = {
                countPlace: 4,
                nameRoom: "TestRoom",
                passwordOfRoom: "",
                roomContainer: RoomContainer,
                roomId: 1
            };

        //send this room for database

        this.facade().sendNotification(RoomCreator, RoomSetting);
    }
}