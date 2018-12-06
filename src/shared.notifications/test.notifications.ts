import { Notification } from "../../PureMVCMulticore/core/pureMVC/notification/Notification";

export const TestShared = Notification.getInstance<string>('TEST_SHARED');