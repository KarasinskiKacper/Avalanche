import { combineReducers } from "redux";
import { createStore } from "redux";

import data from "./data";

const store = createStore(() => {});

export default combineReducers({
	data: data(store.dispatch),
});
