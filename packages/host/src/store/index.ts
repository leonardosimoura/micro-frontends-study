import { combineReducers, createStore } from "redux";


interface IHostState {
    name: string,
}

const initialState: IHostState = {
    name: "Host",
}
const hostReducer = (
    state: IHostState = initialState,
    action: any
): IHostState => {
    switch (action.type) {
        default:
            return state;
    }
    return state;
}

export interface IRootState {
    host: IHostState
}

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        host: hostReducer
    }));

export default store;
