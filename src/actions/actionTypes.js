import axios from "axios";
import { MAP_API_KEY } from "./api_keys";

export const FETCH_DIRECTIONS = "fetch_directions";
export const FORM_CONTENT = "form_content";

const ROOT_URL = "https://maps.googleapis.com/maps/api/directions/";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // workaround for CORS

// const url = "json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY"

export function updateForm(formContent){
    return {
        type: FORM_CONTENT,
        payload: formContent
    };
}

export function fetchDirections(origin, destination) {
    // can be modified for use in search_input.js, add parameters
    // const origin = "Anaheim";
    // const destination = "Irvine";
    const request = axios.get(`${PROXY_URL}${ROOT_URL}json?origin=${origin}&destination=${destination}&key=${MAP_API_KEY}`);

    return {
        type: FETCH_DIRECTIONS,
        payload: request
    };
}

export function fetchMapquest() {

}

export function fetchOpenWeather() {
    
}