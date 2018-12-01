import {Notification} from "../../../PureMVCMulticore/core/pureMVC/notification/Notification";
import {ILoadManifestData, IResourceConfig} from "./resource.loader.interfaces";

export const LoadManifest = Notification.getInstance<ILoadManifestData>('LOAD_MANIFEST');
export const LoadAssets = Notification.getInstance<IResourceConfig>('LOAD_ASSETS');
export const ShareResourceLoadProgress = Notification.getInstance<number>('SHARE_RESOURCE_LOAD_PROGRESS');