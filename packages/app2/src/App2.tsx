import * as React from "react";
import { nanoid } from 'nanoid'
import { BehaviorSubject, Subject } from "rxjs";
import { version } from '../package.json';
interface App2Props {
    serviceComunication: ServiceComunication;
}
interface Notification {
    id: string,
    title: string,
    data: any
}

interface ServiceComunication {
    receive: Subject<any>,
    send: Subject<any>,
}
const divStyle = {
    border: '10px solid blue',
    padding: '10px'
};

const App2 = (props: App2Props) => {

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
    const dispatchNotification = () => {

        props.serviceComunication.send.next(
            {
                id: nanoid(),
                app: 'App2',
                title: 'New Notification From App2 V: ' + version,
                data: {}
            }
        );
    }

    return (
        <div style={divStyle}>
            <h1>App2</h1>
            <button onClick={dispatchNotification} >New Notification From App</button>
            <hr></hr>
            <ul> {notification.map(renderNotification)}</ul>
        </div>

    );
}

export default App2;
