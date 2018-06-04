import initialState from "./initialState";
import { FETCH_PLACES, CLEAR_PLACES, FETCH_MORE_PLACES } from "../actions/actionTypes";

export default function(state = initialState.state, action) {
    switch(action.type) {
        case FETCH_PLACES:
            // returns results array from fetched places inside an object
            // console.log(action.payload.data);
            return { 
                nextPageToken: action.payload.data.next_page_token, 
                results: action.payload.data.results
             };
        case CLEAR_PLACES:
            return {};
        case FETCH_MORE_PLACES:
            let cleanState = { ...state };
            cleanState.nextPageToken = action.payload.data.next_page_token;
            cleanState.results.concat(action.payload.data.results);
            return cleanState;
        default:
            return state;
    }
}