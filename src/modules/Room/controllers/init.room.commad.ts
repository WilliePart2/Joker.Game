import {BaseCommand} from "../../../../PureMVCMulticore/core/pureMVC/command/BaseCommand";
import {IGameInitData} from "../../../game.core/common.interfaces/game.data";
import {Notification} from "../../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {InitRoomPlace} from "../Room.notification";
import * as PIXI from 'pixi.js';
import cacheStepsPerColorChannel = PIXI.CanvasTinter.cacheStepsPerColorChannel;
import { BackgroundModule } from "../../../module.names";
import { TestShared } from "../../../shared.notifications/test.notifications";

export class InitRoomCommand extends BaseCommand {
    async execute(notification: Notification<IGameInitData>): Promise<any> {
        super.execute(notification);

        let RoomData: IGameInitData = notification.body,
            RoomContainer: PIXI.Container = RoomData.stage,
            PlaceSprite: PIXI.Sprite = null,
            pathToFile: string = 'assets/img/Place.png',
            CountPlace: number = 4,
            space: number = 70,
            xOfset: number = 110;

        this.sendNotficationToModule(BackgroundModule.name, TestShared);

        // PIXI.loader.add(pathToFile)
        //     .load(() => {
        //         setup();
        //     });

        // function setup() {
        //     for (let i: number = 0; i < CountPlace; i++) {
        //         PlaceSprite = new PIXI.Sprite(PIXI.utils.TextureCache[pathToFile]);
        //         let x = (PlaceSprite.height + space) * i + xOfset;
        //         PlaceSprite.x = x;
        //         if (i == 0 || i == CountPlace - 1) {
        //             PlaceSprite.y = PlaceSprite.width / 2;
        //         }
        //         RoomContainer.addChild(PlaceSprite);
        //     }
        // }

        //don't work 
        /*this.facade().sendNotification(InitRoomPlace,
            {
                idRoom: 0,
                nameRoom: "CookTestingHall",
                countPlace: 4,
                stage: RoomContainer,
                PlaceSprite: PlaceSprite
            });*/

    }

}