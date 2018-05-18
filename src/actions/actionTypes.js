import axios from "axios";
import { MAP_API_KEY, INCIDENTS_API_KEY } from "./apiKeys";

export const FETCH_DIRECTIONS = "fetch_directions";
export const FETCH_INCIDENTS = "fetch_incidents";
export const CLEAR_INCIDENTS = "clear_incidents";
export const FORM_CONTENT = "form_content";

const GOOGLE_ROOT_URL = "https://maps.googleapis.com/maps/api/directions/";
const MAPQUEST_ROOT_URL = "http://www.mapquestapi.com/traffic/v2/incidents";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // workaround for CORS

// const url = "json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY"

export function updateForm(formContent){
    return {
        type: FORM_CONTENT,
        payload: formContent
    };
}

export function fetchDirections({ originInput, destinationInput, travelMode, alternativeRoute, unit, ...values }) {
    // can be modified for use in search_input.js, add parameters
    // https://maps.googleapis.com/maps/api/directions/
    // json?origin=Toronto&destination=Montreal
    // &avoid=highways|tolls|ferries&mode=bicycling&alternatives=true&units=imperial
    // &key=
    let BUILDURL = `${PROXY_URL}${GOOGLE_ROOT_URL}json?origin=${originInput}&destination=${destinationInput}
    &mode=${travelMode}&alternatives=${alternativeRoute}&units=${unit}`;

    let avoidArr = [];
    if (values.avoidTolls) { avoidArr.push("tolls"); }
    if (values.avoidHighways) { avoidArr.push("highways"); }
    if (values.avoidFerries) { avoidArr.push("ferries"); }
    if (values.avoidIndoor) { avoidArr.push("indoor"); }
    const avoidStr = avoidArr.join("|");

    if (avoidStr !== "") { BUILDURL += `&avoid=${avoidStr}`; }
    // console.log(BUILDURL);
    const request = axios.get(BUILDURL + `&key=${MAP_API_KEY}`);

    return {
        type: FETCH_DIRECTIONS,
        payload: request
    };
}

export function fetchIncidents(routeNum, stepNum, segObj) {
    // given a route number, the step number for that object, and the segment pair object,
    // make the API call for that single segment.

    const MAPQUEST_URL = `${PROXY_URL}${MAPQUEST_ROOT_URL}?key=${INCIDENTS_API_KEY}&boundingBox=${segObj.corner1.lat},${segObj.corner1.lng},${segObj.corner2.lat},${segObj.corner2.lng}&filters=construction,incidents,event,congestion`;
    // const request = axios.get(MAPQUEST_URL);
    return {
        type: FETCH_INCIDENTS,
        payload: axios.get(MAPQUEST_URL).then(request => ({ request, routePayload: routeNum, stepPayload: stepNum }))
    }
    // arrow function returns autmatically if it is not wrapped in curly braces.
    // why this works: https://github.com/redux-utilities/redux-promise/blob/master/src/index.js#L11
}

export function clearIncidents() {
    // clears incident state when making a new search
    return {
        type: CLEAR_INCIDENTS,
        payload: {}
    }
}

export function fetchLandmarks() {
    return;
}

export function fetchOpenWeather() {
    
}