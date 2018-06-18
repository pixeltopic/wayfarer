import initialState from "./initialState";
import { FETCH_PLACE_PHOTOS, CLEAR_PLACE_PHOTOS } from "../actions/actionTypes";
// import _ from "lodash";

export default function(state = initialState.state, action) {
    switch(action.type) {
        case FETCH_PLACE_PHOTOS:
            // console.log(action.payload);
            // const index = Object.keys(state).length;
            // return { ...state, [index]: action.payload.data };

            // returning object of binary data
            // const imageBinaryArr = _.map(action.payload, obj => obj.data);
            // return { ...imageBinaryArr };

            // returning object of URLS
            return { ...action.payload };
        case CLEAR_PLACE_PHOTOS:
            return {};
        default:
            return state;
    }
}