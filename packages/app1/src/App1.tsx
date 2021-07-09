import * as React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Store } from "redux";
import { nanoid } from 'nanoid'
import { BehaviorSubject, Subject } from "rxjs";

interface App1Props {
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
    border: '1px solid red',
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
    const dispatchNotification = () => {

        props.serviceComunication.send.next(
            {
                id: nanoid(),
                app: 'App1',
                title: 'Nova Notificacao From App1',
                data: {}
            }
        );
    }

    return (
        <div style={divStyle}>
            <h1>App1</h1>
            <button onClick={dispatchNotification} >New Notification From App</button>
            <hr></hr>
            <ul> {notification.map(renderNotification)}</ul>
        </div>

    );
}

export default App1;
