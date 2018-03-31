import { combineReducers } from "redux";
import GoogleReducer from "./reducer_google";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    googleData: GoogleReducer,
    form: formReducer // currently unused.
});

export default rootReducer;