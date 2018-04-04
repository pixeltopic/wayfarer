import { combineReducers } from "redux";
import GoogleReducer from "./reducer_google";
import FormContent from "./reducer_form_content";
import { reducer as formReducer } from "redux-form";

/*
state = {
    formContent: ...,
    googleData: ...,
    form: ...
}
*/

const rootReducer = combineReducers({
    formContent: FormContent,
    googleData: GoogleReducer,
    form: formReducer
});

export default rootReducer;