import { combineReducers } from "redux";
import reducerDirections from "./reducerDirections";
import reducerSearchParameters from "./reducerSearchParameters";
import reducerIncidents from "./reducerIncidents";
import reducerPlaces from "./reducerPlaces";
import reducerPlaceDetails from "./reducerPlaceDetails";
import { reducer as formReducer } from "redux-form";

/*
state = {
    formContent: ...,
    googleData: ...,
    form: ...
}
*/

const rootReducer = combineReducers({
    searchParameters: reducerSearchParameters,
    directionData: reducerDirections,
    form: formReducer,
    incidentsData: reducerIncidents,
    placesData : reducerPlaces,
    placeDetails : reducerPlaceDetails
});

export default rootReducer;