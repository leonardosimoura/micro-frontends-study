import * as React from "react";
import { nanoid } from 'nanoid'
import { BehaviorSubject, Subject } from "rxjs";
import { version } from '../package.json';
interface App2Props {
    onNotification(notification: Notification): void;
    label: string;
}
interface Notification {
    id: string,
    app: string,
    title: string,
    data: any
}

const buttonStyle = {
    color: 'red'
};

const ButtonNotification = (props: App2Props) => {

    const dispatchNotification = () => {
        if (props.onNotification)
            props.onNotification({
                id: nanoid(),
                app: 'App2',
                title: 'New Notification From Remote components package V: ' + version,
                data: {}
            });
    }

    return (
        <button style={buttonStyle} onClick={dispatchNotification} >{props.label ?? "New notification"}</button>
    );
}

export default ButtonNotification;
