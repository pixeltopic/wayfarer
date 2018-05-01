// import _ from "lodash";
import initialState from "./initialState";
import { FETCH_DIRECTIONS } from "../actions/actionTypes";

export default function(state = initialState.state, action) {
    switch (action.type) {
        case FETCH_DIRECTIONS:
            // console.log(action.payload["data"]["routes"]["0"]["legs"]["0"]);
            return { ...action.payload.data.routes} ; // route categories will be divided into 0, 1, 2...
            // remember: returning a new OBJECT not an array. return type consistent
        default:
            return state;
    }
}