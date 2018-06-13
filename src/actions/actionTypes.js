import axios from "axios";
import { MAP_API_KEY, INCIDENTS_API_KEY } from "./apiKeys";
import { convertPriceLevel } from "../logic/placesLogic.js";

export const FETCH_DIRECTIONS = "fetch_directions";
export const FETCH_INCIDENTS = "fetch_incidents";
export const CLEAR_INCIDENTS = "clear_incidents";
export const SEARCH_PARAMETERS = "search_parameters";
export const FETCH_PLACES = "fetch_places";
export const CLEAR_PLACES = "clear_places";
export const FETCH_MORE_PLACES = "fetch_more_places";

const GOOGLE_ROOT_URL = "https://maps.googleapis.com/maps/api/directions/";
const MAPQUEST_ROOT_URL = "http://www.mapquestapi.com/traffic/v2/incidents";
const GOOGLE_PLACES_ROOT_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // workaround for CORS

// const url = "json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY"

export function updateSearchParameters({ travelMode, alternativeRoute, unit, originInput, destinationInput }){
    // reduxForm reinitializes travelMode, alternativeRoute, and unit on re-render, so
    // this action saves the inputted form parameters into a state on form submit.

    return {
        type: SEARCH_PARAMETERS,
        payload: { travelMode, alternativeRoute, unit, originInput, destinationInput }
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

export function fetchIncidents(routeNum, stepNum, segObj, latLngData) {
    // given a route number, the step number for that object, and the segment pair object,
    // make the API call for that single segment.

    const MAPQUEST_URL = `${PROXY_URL}${MAPQUEST_ROOT_URL}?key=${INCIDENTS_API_KEY}&boundingBox=${segObj.corner1.lat},${segObj.corner1.lng},${segObj.corner2.lat},${segObj.corner2.lng}&filters=construction,incidents,event,congestion`;
    // const request = axios.get(MAPQUEST_URL);
    return {
        type: FETCH_INCIDENTS,
        payload: axios.get(MAPQUEST_URL).then(request => ({ request, routePayload: routeNum, stepPayload: stepNum, latLngQueue: latLngData, segObj: segObj }))
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

export function fetchPlaces({ keywordInput, typeInput, radiusInput, minPrice, maxPrice }, location, unit) {
    // given values from searchInputPlaces form, location from this.props.directionData, 
    // and unit from this.props.searchParameters, make a Places API request
    const minPriceVal = convertPriceLevel(minPrice);
    const maxPriceVal = convertPriceLevel(maxPrice);
    const radiusInMeters = unit === "imperial" ? parseFloat(radiusInput) * 1609 : parseFloat(radiusInput) * 1000;

    let BUILDURL = `${PROXY_URL}${GOOGLE_PLACES_ROOT_URL}?location=${location.lat},${location.lng}&radius=${radiusInMeters}${keywordInput ? `&keyword=${keywordInput}` : ""}${typeInput ? `&type=${typeInput}` : ""}${minPriceVal !== -1 ? `&minprice=${minPriceVal}` : ""}${maxPriceVal !== -1 ? `&maxprice=${maxPriceVal}` : ""}&key=${MAP_API_KEY}`;

    const request = axios.get(BUILDURL);

    return {
        type: FETCH_PLACES,
        payload: request
    };
}

export function clearPlaces() {
    // clear places found when making a new search
    return {
        type: CLEAR_PLACES,
        payload: {}
    }
}

export function fetchMorePlaces(token) {
    // fetch next page after previous 20 results. only possible to be called if pagetoken is not undefined
    let BUILDURL = `${PROXY_URL}${GOOGLE_PLACES_ROOT_URL}?pagetoken=${token}&key=${MAP_API_KEY}`;
    // callback used to increment page number in showPlaces local state
    // console.log(BUILDURL);
    const request = axios.get(BUILDURL);
    // request.then(_.debounce(() => callback()),500); // can't be on the same line as const request

    return {
        type: FETCH_MORE_PLACES,
        payload: request
    }

}

export function fetchOpenWeather() {
    
}