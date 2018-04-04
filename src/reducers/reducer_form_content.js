import initialState from "./initialState";
import { FORM_CONTENT } from "../actions/actionTypes";

export default function(state = initialState.state, action) {
    switch (action.type) {
        case FORM_CONTENT:
            // returns an object with stored data from the form
            return action.payload;

        default:
            return state;
    }
}