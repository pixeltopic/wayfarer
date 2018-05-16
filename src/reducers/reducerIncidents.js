import initialState from "./initialState";
import { FETCH_INCIDENTS, CLEAR_INCIDENTS } from "../actions/actionTypes";

export default (state = initialState.state, action) => {
    switch (action.type) {
        case FETCH_INCIDENTS:
            // note: action.payload.data: payload is produced by redux promise middleware.
            console.log(action.payload); // testing to see if action returns correct object with nested promise
            return state;
        case CLEAR_INCIDENTS:
            return {};
        default:
            return state;
    }

}