import {createStore, combineReducers} from "redux";
import {usersReducer} from './reducers/usersReducer';
import {composeWithDevTools} from "redux-devtools-extension";
import {tableReducer} from "./reducers/tableReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    tables: tableReducer
})

export const store = createStore(rootReducer, composeWithDevTools());