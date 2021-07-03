import { NOTIFICATION, NotificationActionTypes, NotificationModel } from "./types";

export function notification(model: NotificationModel): NotificationActionTypes {
    return {
        type: NOTIFICATION,
        payload: model
    }
}