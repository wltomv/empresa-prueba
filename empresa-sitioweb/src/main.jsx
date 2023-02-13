import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css";

import { Provider } from "react-redux";
import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { employeesReducer } from "./state/reducers/employees";

const mainReducer = combineReducers({ employees: employeesReducer });

const store = createStore(mainReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
