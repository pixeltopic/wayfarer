import initialState from "./initialState";
import { FETCH_INCIDENTS, CLEAR_INCIDENTS } from "../actions/actionTypes";

export default (state = initialState.state, action) => {
    switch (action.type) {
        case FETCH_INCIDENTS:
            // note: action.payload.data: payload is produced by redux promise middleware.
            // console.log(action); // testing to see if action returns correct object with nested promise
            // console.log(action.routePayload);
            const { routePayload, stepPayload, request } = action.payload;
            let cleanState = { ...state };
            if (cleanState[routePayload]) {
                cleanState[routePayload] = {...cleanState[routePayload], [stepPayload]: request.data };
            } else {
                cleanState[routePayload] = { [stepPayload]: request.data };
            }
            // console.log(cleanState); // next, make it only calls upon form submission.
            return cleanState;
            
            // return state;
        case CLEAR_INCIDENTS:
            return {};
        default:
            return state;
    }

}