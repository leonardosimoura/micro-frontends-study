import * as React from "react";
import { nanoid } from 'nanoid'
import { BehaviorSubject, Subject } from "rxjs";
import { version } from '../package.json';
interface App2Props {
    onNotification(notification: Notification): void;
}
interface Notification {
    id: string,
    app: string,
    title: string,
    data: any
}

const ButtonNotification = (props: App2Props) => {

    const dispatchNotification = () => {
        if (props.onNotification)
            props.onNotification({
                id: nanoid(),
                app: 'App2',
                title: 'New Notification From App2 V: ' + version,
                data: {}
            });
    }

    return (
        <button onClick={dispatchNotification} >New Notification From App</button>
    );
}

export default ButtonNotification;
