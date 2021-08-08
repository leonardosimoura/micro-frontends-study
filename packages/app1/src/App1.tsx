import * as React from "react";
import { Subject } from "rxjs";
import { ExternalComponent } from './externalComponent';

interface App1Props {
    serviceComunication: ServiceComunication;
}
interface Notification {
    id: string,
    app: string,
    title: string,
    data: any
}

interface ServiceComunication {
    receive: Subject<any>,
    send: Subject<any>,
}
const divStyle = {
    border: '10px solid red',
    padding: '10px'
};

const App1 = (props: App1Props) => {

    const [notification, setNotification] = React.useState<Array<any>>([]);

    props.serviceComunication.receive.subscribe(data => {
        setNotification([
            ...notification,
            data
        ]);
    });

    const renderNotification = (notification: Notification) => {
        return <li key={notification.id}>{notification.id} - {notification.title}</li>
    }

    const onNotification = (notification: Notification) => {
        props.serviceComunication.send.next(notification);
    }

    const remoteNotificationButtonV1_0_0 = ExternalComponent<{
        onNotification: (notification: Notification) => void,
        label: string
    }>({
        componentProps: {
            onNotification: onNotification,
            label: "New Notification - 1.0.0"
        },
        module: "./ButtonNotification",
        scope: "components_1_0_0",
        url: "http://localhost:3004/1.0.0.remoteEntry.js"
    });

    const remoteNotificationButtonV1_0_1 = ExternalComponent<{
        onNotification: (notification: Notification) => void,
        label: string
    }>({
        componentProps: {
            onNotification: onNotification,
            label: "New Notification - 1.0.1"
        },
        module: "./ButtonNotification",
        scope: "components_1_0_1",
        url: "http://localhost:3004/1.0.1.remoteEntry.js"
    });

    return (
        <div style={divStyle}>
            <h1>App1</h1>

            {remoteNotificationButtonV1_0_0}
            {remoteNotificationButtonV1_0_1}
            <hr></hr>
            <ul> {notification.map(renderNotification)}</ul>
        </div>

    );
}

export default App1;
