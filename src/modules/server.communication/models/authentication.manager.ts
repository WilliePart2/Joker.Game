import { IAuthenticationResponse, ICommonResponse } from "../interfaces/server.communication.response.interfaces";
import { getAbsPath } from "../utils/urls";
import { HeadersManager } from "./headers.manager";

export class AuthenticationManager {
    private _headersManager: HeadersManager = HeadersManager.getInstance();

    async authenticateUser (): Promise<ICommonResponse<IAuthenticationResponse> | null> {
        let response = await fetch(getAbsPath('authenticate'), {
            method: 'GET',
            headers: this._headersManager.getRequestHeaders()
        });

        if (response.ok) {
            return await response.json() as ICommonResponse<IAuthenticationResponse>;
        }

        return null;
    }
}
