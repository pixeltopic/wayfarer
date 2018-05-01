import { combineReducers } from "redux";
import reducerDirections from "./reducerDirections";
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
    directionData: reducerDirections,
    form: formReducer
});

export default rootReducer;