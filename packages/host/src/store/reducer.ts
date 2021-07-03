import { NOTIFICATION, NotificationActionTypes, NotificationFromAppModel, NotificationModel, NOTIFICATION_FROM_APP } from "./types";

interface IHostState {
    name: string,
    notification: NotificationModel[],
    notificationFromApp: NotificationFromAppModel[]
}

const initialState: IHostState = {
    name: "Host",
    notification: [],
    notificationFromApp: []
}
const hostReducer = (
    state: IHostState = initialState,
    action: NotificationActionTypes
): IHostState => {
    switch (action.type) {
        case NOTIFICATION:
            return {
                ...state,
                notification: [action.payload, ...state.notification]
            }
            break
        case NOTIFICATION_FROM_APP:
            return {
                ...state,
                notificationFromApp: [action.payload, ...state.notificationFromApp]
            }
            break
        default:
            return state;
    }
    return state;
}

export interface IRootState {
    host: IHostState
}

export default hostReducer;