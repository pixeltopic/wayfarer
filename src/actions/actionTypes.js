import axios from "axios";
import { MAP_API_KEY } from "./api_keys";

export const FETCH_DIRECTIONS = "fetch_directions";

const ROOT_URL = "https://maps.googleapis.com/maps/api/directions/";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // workaround for CORS

// const url = "json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY"

export function fetchDirections() {
    const origin = "Anaheim";
    const destination = "Irvine";
    const request = axios.get(`${PROXY_URL}${ROOT_URL}json?origin=${origin}&destination=${destination}&key=${MAP_API_KEY}`);

    return {
        type: FETCH_DIRECTIONS,
        payload: request
    };
}