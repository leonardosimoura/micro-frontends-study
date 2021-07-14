import React from "react";
import { serviceComunication } from "./servicesComunication";
import { nanoid } from 'nanoid';

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");

    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

function System(props) {
  const { ready, failed } = useDynamicScript({
    url: props.system && props.system.url,
  });

  if (!props.system) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.system.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component serviceComunication={serviceComunication} />
    </React.Suspense>
  );
}

const Notifications = () => {
  serviceComunication.send.subscribe(data => {
    setNotification([
      ...notification,
      data
    ]);
  });

  const [notification, setNotification] = React.useState([]);

  const renderNotification = (notification) => {
    return <li key={notification.id}>{notification.id} - {notification.app} - {notification.title}</li>
  }
  return (
    <ul>{notification.map(renderNotification)}</ul>
  );
}

function App() {
  const [system, setSystem] = React.useState(undefined);

  function setApp1V1_0_0() {
    setSystem({
      url: "http://localhost:3002/1.0.0.remoteEntry.js",
      scope: "app1_1_0_0",
      module: "./App1",
    });
  }

  function setApp1V1_1_0() {
    setSystem({
      url: "http://localhost:3002/1.1.0.remoteEntry.js",
      scope: "app1_1_1_0",
      module: "./App1",
    });
  }

  function setApp1V1_2_0() {
    setSystem({
      url: "http://localhost:3002/1.2.0.remoteEntry.js",
      scope: "app1_1_2_0",
      module: "./App1",
    });
  }

  function setApp1Latest() {
    setSystem({
      url: "http://localhost:3002/remoteEntry.js",
      scope: "app1",
      module: "./App1",
    });
  }

  function newNotification() {
    serviceComunication.receive.next({
      id: nanoid(),
      app: 'App1',
      title: 'Nova Notificacao From App1',
      data: {}
    });
  }

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h1>Host</h1>
      <p>
        The Dynamic System will take advantage Module Federation{" "}
        <strong>remotes</strong> and <strong>exposes</strong>. It will no load
        components that have been loaded already.
      </p>
      <button onClick={newNotification}>New Notification</button>
      <hr></hr>
      <button onClick={setApp1V1_0_0}>Load App 1 - V: 1.0.0</button>
      <button onClick={setApp1V1_1_0}>Load App 1 - V: 1.1.0</button>
      <button onClick={setApp1V1_2_0}>Load App 1 - V: 1.2.0</button>
      <button onClick={setApp1Latest}>Load App 1 - V: latest</button>
      <div style={{ marginTop: "2em" }}>
        <System system={system} />
      </div>
      <Notifications></Notifications>
    </div>
  );
}

export default App;
