import _ from "lodash";
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
    // given array of corner pairs, assert they are all under 50,000 square miles.
    const kmSq = 129499;
    arr.forEach((box) => {
        const corner1 = box.corner1;
        const corner2 = box.corner2;
        const length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        const width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        console.log("Debugging l*w:", length*width, "< 129499");
    })
}

/* new algorithm proposal

shift out from list.
iterate through array backwards to find the FIRST latlong that is under 50,000.
return that pair, and discard everything before the latlong just found
repeat until main list is length 0

... reverse array, pop() corner1 out, then iterate forward for corner2.
for the FIRST latlong that is under 50,000 when W * L, that is corner 2 so...
once found, return index, get data and return pair, then SLICE array,
repeat process until array length 0
*/

export const genSegmentArr1 = (latLngArr) => {
    let result = [];
    const kmSq = 129499;
    let tempArr = latLngArr.reverse();
    let corner1;
    let corner2;
    let i;
    while (tempArr.length >= 2) {
        corner1 = tempArr.pop();
        for (i = 0; i < tempArr.length; i++) {
            corner2 = tempArr[i];
            const length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
            const width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;
            if (length*width <= kmSq) {
                console.log("Debugging l*w:", length*width, "< 129499");
                break;
            }
        }
        result.push({ corner1, corner2 })
        tempArr = tempArr.slice(0,i-1); // retain all data from biggest to largest corner previously
    }

    return {...result};
}

export const genSegmentArr = (latLngArr) => {
    let result = [];
    const kmSq = 129499;
    let tempArr = latLngArr;
    let corner1;
    let corner2;
    let length;
    let width;
    let i;
    let prev;
    // initial check: assert origin to destination is under 50,000 sq miles.
    const origin = tempArr[0];
    const dest = tempArr[tempArr.length-1];
    const firstl = getDistance(origin, { lat: origin.lat, lng: dest.lng }) / 1000;
    const firstw = getDistance(dest, { lat: origin.lat, lng: dest.lng }) / 1000;
    if (firstl*firstw <= kmSq) {
        return { 0: origin, 1: dest};
    }

    while (tempArr.length != 0) {
        corner1 = tempArr.shift(); // shift shortest corner out from front index
        for (i = 0; i < tempArr.length; i++) {
            corner2 = tempArr[i];
            length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
            width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;
            if (length*width > kmSq) {
                // console.log("debug: l*w:", length*width, "< 129499");
                corner2 = tempArr[prev];
                break;
            }
            prev = i;
        }
        result.push({ corner1, corner2 })
        tempArr = tempArr.slice(i); // retain all bigger data and remove smaller data
    }
    assertSquareMiles(result);

    return {...result};
}

export const genSegmentArr2 = (queue) => {
    // given an array of lat lng objects, calculate the largest size under 50,000 square miles
    // finally return an array containing objects of lat lng object pairs to be fed into mapQuest.

    // from Irvine to Anaheim or Irvine to Riverside there should only be 1 segment returned
    // from Irvine to Berkeley there should be two!
    // see apiKeys.js for test link

    const meterSquare = 129499391611;
    let prev = {};
    let corner1;
    let corner2;
    let segmentArray = [];

    while (queue.length !== 0) {
        corner1 = queue.shift();
        console.log("debug corner1: ", corner1);
        while(queue.length !== 0) {
            corner2 = queue.shift();
            console.log("debug corner2: ", corner2);
            const length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng });
            const width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng });
            console.log("len/wid: ", length, " ", width);
            if (length * width <= meterSquare) {
                prev = corner2;
                console.log("prev: ", prev);
            } else {
                if (!_.isEmpty(prev)) {
                    console.log("ENTERED");
                    queue.unshift(corner2);
                    segmentArray.push({ corner1: corner1, corner2: prev });
                    break;
                } // if prev is invalid, skip segment entirely
            }
        }
    }
    return segmentArray;
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