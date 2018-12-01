import {Notification} from "../../PureMVCMulticore/core/pureMVC/notification/Notification";

export const SharedResourceLoadingProgress = Notification.getInstance<number>('SHARED_RESOURCE_LOADING_PROGRESS');
export const SharedGetTextureByName = Notification.getInstance<string>('SHARED_GET_TEXTURE_BY_NAME');
