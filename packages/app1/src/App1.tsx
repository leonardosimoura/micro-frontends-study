import * as React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Store } from "redux";
import { nanoid } from 'nanoid'

interface App1Props {
    store: Store<any, any>;
}
interface Notification {
    id: string,
    title: string,
    data: any
}

interface IHostState {
    name: string, notification: Notification[]
}

const divStyle = {
    border: '1px solid red',
    padding: '10px'
};

const App1 = () => {
    const state = useSelector((state: any) => state["host"] as IHostState);
    const dispatch = useDispatch()
    const renderNotification = (notification: Notification) => {
        return <li key={notification.id}>{notification.id} - {notification.title}</li>
    }
    const dispatchNotification = () => {
        dispatch({
            type: '[HOST] NOTIFICATION_FROM_APP',
            payload: {
                id: nanoid(),
                app: 'App1',
                title: 'Nova Notificacao From App1',
                data: {}
            }
        });
    }

    return (
        <div style={divStyle}>
            <h1>App1</h1>
            <h3>Name from Host: {state && state.name}</h3>
            <button onClick={dispatchNotification} >New Notification From App</button>
            <hr></hr>
            <ul> {state.notification.map(renderNotification)}</ul>
        </div>

    );
}

const App1Wrapper = (props: App1Props) => {
    const { store } = props;
    return (
        <Provider store={store || {}}>
            <h1> Vai Filhao</h1>
            <App1 />
        </Provider>
    );
}

export default App1Wrapper;
