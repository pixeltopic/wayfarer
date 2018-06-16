import initialState from "./initialState";
import { FETCH_PLACE_DETAILS, CLEAR_PLACE_DETAILS } from "../actions/actionTypes";

export default function(state = initialState.state, action) {
    switch(action.type) {
        case FETCH_PLACE_DETAILS:
            return action.payload.data;
        case CLEAR_PLACE_DETAILS:
            return {};
        default:
            return state;
    }
}