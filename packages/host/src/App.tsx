import * as React from "react";
import { Provider, useSelector } from 'react-redux';
import store, { IRootState } from './store';

const RemoteButton = React.lazy(() => import("app1/Button"));

const App = () => {
  const state = useSelector((state: IRootState) => state["host"]);
  return (

    <div>
      <h1>Typescript</h1>
      <h2>{state && state.name}</h2>
      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
    </div>
  );
}

export default App;
