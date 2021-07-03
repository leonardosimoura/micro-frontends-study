import * as React from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import { notification } from "./store/actions";
import { IRootState } from "./store/reducer";
import { nanoid } from 'nanoid'
const RemoteApp1 = React.lazy(() => import("app1/App1"));

interface NotificationFromApp {
  id: string,
  title: string,
  app: string,
  data: any
}

const divStyle = {
  border: '1px solid green',
  padding: '10px'
};

const AppName = () => {
  const selectAppName = (state: IRootState) => state.host.name;
  const state = useSelector(selectAppName);
  return (

    <h2>{state}</h2>
  );
}

const InnerNotification = () => {
  const selectNotificationFromApp = (state: IRootState) => state.host.notificationFromApp;
  const state = useSelector(selectNotificationFromApp);
  const renderNotification = (notification: NotificationFromApp) => {
    return <li key={notification.id}>{notification.id} - {notification.app} - {notification.title}</li>
  }
  return (
    <ul>{state.map(renderNotification)}</ul>
  );
}

const App = () => {

  const dispatch = useDispatch();

  const dispatchNotification = () => {
    dispatch(notification({
      id: nanoid(),
      title: "Nova Notificacao",
      data: {}
    }))
  }

  return (
    <div style={divStyle}>
      <AppName></AppName>
      <InnerNotification></InnerNotification>
      <button onClick={dispatchNotification} >New Notification From Host</button>
      <hr></hr>
      <React.Suspense fallback="Loading Button">
        <RemoteApp1 store={store} />
      </React.Suspense>
    </div>
  );
}

export default App;
