import axios from "axios";
import { MAP_API_KEY, INCIDENTS_API_KEY } from "./apiKeys";

export const FETCH_DIRECTIONS = "fetch_directions";
export const FORM_CONTENT = "form_content";

const GOOGLE_ROOT_URL = "https://maps.googleapis.com/maps/api/directions/";
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

export function fetchIncidents(lat1, lng1, lat2, lng2) {
    // given latlong, retrieve data from API
    // call this on the age itself. WIP
    const MAPQUEST_URL = `http://www.mapquestapi.com/traffic/v2/${INCIDENTS_API_KEY}?key=KEY&boundingBox={39.95},{-105.25},{39.52},{-104.71}&filters=construction,incidents

    `;
}

export function fetchOpenWeather() {
    
}