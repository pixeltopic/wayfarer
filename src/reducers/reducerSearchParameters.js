import initialState from "./initialState";
import { SEARCH_PARAMETERS } from "../actions/actionTypes";

export default function(state = initialState.state, action) {
    switch (action.type) {
        case SEARCH_PARAMETERS:
            // returns an object with stored data from the form
            console.log("updateSearchParameters:",action.payload);
            return action.payload;

        default:
            return state;
    }
}