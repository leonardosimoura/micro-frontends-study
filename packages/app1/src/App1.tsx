import * as React from "react";
import { Subject } from "rxjs";
const RemoteButtonNotification = React.lazy(() => import("components/ButtonNotification"));

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

    return (
        <div style={divStyle}>
            <h1>App1</h1>

            <React.Suspense fallback="Loading Button">
                <RemoteButtonNotification onNotification={onNotification} />
            </React.Suspense>
            <hr></hr>
            <ul> {notification.map(renderNotification)}</ul>
        </div>

    );
}

export default App1;
