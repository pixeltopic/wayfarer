import initialState from "./initialState";
import { FETCH_PLACES, CLEAR_PLACES, FETCH_MORE_PLACES } from "../actions/actionTypes";

export default function(state = initialState.state, action) {
    switch(action.type) {
        case FETCH_PLACES:
            // returns results array from fetched places inside an object
            // console.log(action.payload.data);
            
            let emptyState = {};
            if (action.payload.data.next_page_token) {
                emptyState.nextPageToken = action.payload.data.next_page_token;
            }
            emptyState.results = action.payload.data.results;
            return emptyState;

            // return { 
            //     nextPageToken: action.payload.data.next_page_token, 
            //     results: resultArr
            //     // 2d array where each index of outer array = search page #.
            //     // when filtering results, array will be flattened. page # stays the same, but rendered posts will differ
            //  };
        case CLEAR_PLACES:
            return {};
        case FETCH_MORE_PLACES:
            // console.log("entered reducer, payload:",action.payload);
            let cleanState = { results: state.results };
 
            if (action.payload.data.next_page_token) {
                cleanState.nextPageToken = action.payload.data.next_page_token;
            }
            
            // console.log("next page results:",action.payload.data.results);
            cleanState.results = cleanState.results.concat(action.payload.data.results);
            return cleanState;
        default:
            return state;
    }
}