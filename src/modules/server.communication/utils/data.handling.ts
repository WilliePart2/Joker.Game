import { ICommonResponse } from "../interfaces/server.communication.response.interfaces";

export function getResponsePayload <T>(resp: ICommonResponse<T>): T {
    return resp.payload;
}

/**
 * but beautiful code -______-
 * @param dataObject
 */
export function createQueryString (dataObject: {[key: string]: any}): string {
    return Object.keys(dataObject)
        .reduce((queryString: string, nextChainKey: string) =>
            (queryString += `${nextChainKey}=${dataObject[nextChainKey]}&`), '');
}
