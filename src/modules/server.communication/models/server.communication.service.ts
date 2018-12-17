import { Proxy } from "../../../../PureMVCMulticore/core/pureMVC/Proxy";
import { ISignInToGameRoomData } from "../interfaces/server.communication.response.interfaces";
import { HeadersManager } from "./headers.manager";
import { LongPolingConnector } from "./long.poling.connector";

export class ServerCommunicationService extends Proxy {
    static NAME = 'ServerCommunicationService';
    private headersManager: HeadersManager = new HeadersManager();
    private stateUpdatesChanel: LongPolingConnector;

    /**
     * Method retrieve start data for gaming in current room
     */
    async signInToGameRoom (): Promise<ISignInToGameRoomData | null> {
        let resp: Response = await fetch(this.getAbsPath('sign-in-to-room'), {
            method: 'GET',
            headers: this.headersManager.getRequestHeaders()
        });

        if (resp.ok) {
            return resp.json();
        } else {
            return null;
        }
    }

    subscribeToGameStateUpdates (url: string) {
        this.stateUpdatesChanel = new LongPolingConnector();
        this.stateUpdatesChanel.connect(url);
        this.stateUpdatesChanel.onMessage((msg: string) => {});
        this.stateUpdatesChanel.onOpen(() => {});
        this.stateUpdatesChanel.onClose(() => {});
        this.stateUpdatesChanel.onError(() => {});
    }

    private getAbsPath (path: string, port?: number): string {
        return `${this.getServerAddr()}${port ? `:${port}` : ''}/${path}`;
    }

    private getServerAddr (): string {
        return `${location.protocol}//${location.host}`;
    }
}
