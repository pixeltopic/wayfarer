// import _ from "lodash";
import { getDistance } from "geolib";

export const genLatLngQueue = (route) => {
    // given single route object, return an array of {lat, lng} from every step.
    const stepArray = route["legs"]["0"]["steps"];
    let latLngQueue = [];

    stepArray.forEach((step) => {
        latLngQueue.push(step.start_location);
        latLngQueue.push(step.end_location);
    })
        
    return latLngQueue;
}

export const assertSquareMiles = (arr) => {
    // given array of corner pairs, assert they are all under 50,000 square miles and not equal to zero.
    
    arr.forEach((box) => {
        const { corner1, corner2 } = box;
        // const corner1 = box.corner1;
        // const corner2 = box.corner2;
        const length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        const width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        console.log("Debugging l*w:", length*width, "< 129499");
    });

    const newArr = arr.filter((box) => {
        const { corner1, corner2 } = box;
        const length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        const width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        return length * width !== 0;
    });

    return newArr;
}

export const genSegmentObj = (latLngArr) => {
    // returns an object with int keys and a corner1 and corner2 attribute which then contains 
    // latlngs for a bounding box. The bounding box is the fewest number of < 50k square mile segments.

    let result = [];
    const kmSq = 129499;
    let tempArr = latLngArr;
    let corner1, corner2, length, width, i, prev;

    // initial check: assert origin to destination is under 50,000 sq miles.
    const origin = tempArr[0];
    const dest = tempArr[tempArr.length-1];
    const firstl = getDistance(origin, { lat: origin.lat, lng: dest.lng }) / 1000;
    const firstw = getDistance(dest, { lat: origin.lat, lng: dest.lng }) / 1000;
    if (firstl*firstw <= kmSq) {
        return { 0: { corner1: origin, corner2: dest } };
    }

    while (tempArr.length !== 0) {
        corner1 = tempArr.shift(); // shift shortest corner out from front index
        for (i = 0; i < tempArr.length; i++) {
            console.log("tempArr length=",tempArr.length);
            corner2 = tempArr[i];
            length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
            width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;
            console.log("debug: l*w:", length*width, "< 129499");
            if (length*width > kmSq) {
                console.log("debug: l*w exceeded:", length*width, "< 129499");
                corner2 = tempArr[prev];
                break;
            }
            prev = i;
        }
        result.push({ corner1, corner2 })
        tempArr = tempArr.slice(i-1); // retain all bigger data and remove smaller data
    }
    result = assertSquareMiles(result);

    return {...result};
}

// after, call an action creator, passing in the findAreaSegments array and a number assigned to route
    // eg. state = { 0: { segment0: {mapquestData}, segment1: {data},...} 1: {...}}
    // (note for the future: if 0:, 1:, 2: etc already exist in the state, don't make API calls again!)
    // (this also means that upon making a new searchInput, there must be an action to reset state to {})

    // this data in the outermost key is synchronized to the findAreaSegments array.
    // load this data to the component using componentWillReceiveProps

    // in a new method, calculate distance of incidents corresponding to the segment data, filter out
    // any that are irrelevant.

    // put these relevant incidents into an array and render them into their corresponding route tab
    // tabs will be assigned 0, 1, 2, etc so make sure to render the correct array from state
    // when changing each tab