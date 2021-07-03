export const NOTIFICATION = '[HOST] NOTIFICATION';

export const NOTIFICATION_FROM_APP = '[HOST] NOTIFICATION_FROM_APP';

export interface NotificationModel {
    id: string,
    title: string,
    data: any
}

export interface NotificationFromAppModel {
    id: string,
    app: string,
    title: string,
    data: any
}

export interface NewNotificationAction {
    type: typeof NOTIFICATION
    payload: NotificationModel
}

export interface NewNotificationFromAppAction {
    type: typeof NOTIFICATION_FROM_APP
    payload: NotificationFromAppModel
}

export type NotificationActionTypes = NewNotificationAction | NewNotificationFromAppAction;