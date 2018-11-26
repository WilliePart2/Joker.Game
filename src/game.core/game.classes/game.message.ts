import {IMessage} from "../common.interfaces/game.data";

export class GameMessage implements IMessage {

    messageBod: string;
    nameUser: string;

    constructor(bc_json: string){
        let data = JSON.parse(bc_json);
        if(!data.nameUser || !data.messageBod){
            throw new Error("Invalin at the board! in coponent message!");
        }

        this.nameUser = data.nameUser;
        this.messageBod = data.messageBod;
    }

    getName(): string{
        return this.nameUser;
    }
    getMessage(): string{
        return this.messageBod;
    }

}