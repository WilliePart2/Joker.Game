import { IRequestHeaders } from "../interfaces/server.communication.common.interfaces";

export class HeadersManager {
    private static _instance: HeadersManager;

    static getInstance () {
        if (!this._instance) {
            this._instance = new this();
        }

        return this._instance;
    }

    getRequestHeaders (): IRequestHeaders {
        return {};
    }
}
