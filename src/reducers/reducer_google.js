import _ from "lodash";
import initialState from "./initialState";
import { FETCH_DIRECTIONS } from "../actions/actionTypes";

export default function(state = initialState.state, action) {
    switch (action.type) {
        case FETCH_DIRECTIONS:
            return action.payload["data"]["routes"]["0"]["legs"]["0"];

        default:
            return state;
    }
}