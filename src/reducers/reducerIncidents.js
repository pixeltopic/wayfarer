import initialState from "./initialState";
import { FETCH_INCIDENTS, CLEAR_INCIDENTS } from "../actions/actionTypes";
import { getBoundingBox, insideBoundingBox } from "geolocation-utils";
import { getDistance } from "geolib";

export default (state = initialState.state, action) => {
    switch (action.type) {
        case FETCH_INCIDENTS:
            // note: action.payload.data: payload is produced by redux promise middleware.
            // console.log(action); // testing to see if action returns correct object with nested promise
            // console.log(action.routePayload);
            const { routePayload, request, latLngQueue, segObj } = action.payload;
            // right now we have: routePayload: a number identifying route
            // stepPayload: a number identifying a segment step in a route
            // request: the resolved promise from MapQuest API
            // latLngQueue: an array of latitude longitude pairs
            // segObj: a single segment bounding box, consisting of a corner1 and corner2

            // use getBoundingBox([{lat: segObj.corner1.lat, lon: segObj.corner1.lng}, {lat:,lon:}]) 
            // to filter(insideBoundingBox({lat: incident.lat, lon: incident.lng}, newObj) == true) 
            // everything from latLngQueue using the produced object, then
            // check each incident from the current request segment 
            // to every latlng in the filtered array using getDistance. 
            // Incident array of objects shouldnt need to be filtered.

            // then put the filtered incidents
            // into the state value where request.data.incidents used to be

            console.log("latLngQueue:", latLngQueue);
            console.log("associated segment:", segObj);
            console.log("original incidents:", request.data.incidents);

            const segObjBoundingBox = getBoundingBox(
                [{ lat: segObj.corner1.lat, lon: segObj.corner1.lng }, 
                { lat: segObj.corner2.lat ,lon: segObj.corner2.lng }]
            );

            const filteredSteps = latLngQueue.filter((step) => {
                // filters the steps relevant for this segment
                return insideBoundingBox({lat: step.lat, lon: step.lng}, segObjBoundingBox);
            });

            console.log("new associated segment:", segObjBoundingBox);

            const filteredIncidents = request.data.incidents.filter((incident) => {
                // if incident is within 2000 meters of any step, retain it.
                for (let i = 0; i < filteredSteps.length; i++) {
                    if (getDistance({lat: filteredSteps[i].lat, lng: filteredSteps[i].lng}, incident) <= 5000) {
                        return true;
                    }
                }
                return false;
            });

            console.log("filtered latLngQueue:", filteredSteps);
            console.log("filtered incidents:", filteredIncidents);

            let cleanState = { ...state };
            if (cleanState[routePayload]) {
                const newIncidentArray = cleanState[routePayload].concat(filteredIncidents);
                cleanState[routePayload] = newIncidentArray;
            } else {
                cleanState[routePayload] = filteredIncidents;
            }
            
            return cleanState;
            
            // return state;
        case CLEAR_INCIDENTS:
            return {};
        default:
            return state;
    }

}