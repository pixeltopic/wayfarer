import { getDistance } from "geolib";

const genLatLngQueue = (route) => {
    // given single route object, return an array of {lat, lng} from every step.
    const stepArray = route["legs"]["0"]["steps"];
    let latLngQueue = [];

    stepArray.forEach((step) => {
        latLngQueue.push(step.start_location);
        latLngQueue.push(step.end_location);
    })
        
    return latLngQueue;
}

const genUniqueLatLngQueue = (route) => {
    // given single route object, return an array of {lat, lng} from every step but with uniqueness.
    const stepArray = route["legs"]["0"]["steps"];
    let latLngQueue = [];

    stepArray.forEach((step) => {
        if (latLngQueue.find((latLngPair) => latLngPair.lat === step.start_location.lat && latLngPair.lng === step.start_location.lng) === undefined) {
            latLngQueue.push(step.start_location);
        }
        if (latLngQueue.find((latLngPair) => latLngPair.lat === step.end_location.lat && latLngPair.lng === step.end_location.lng) === undefined) {
            latLngQueue.push(step.end_location);
        }
    });
        
    return latLngQueue;
}

const assertSquareMiles = (arr) => {
    // given array of corner pairs, assert they are all under 50,000 square miles and not equal to zero.
    
    /*arr.forEach((box) => {
        const { corner1, corner2 } = box;
        // const corner1 = box.corner1;
        // const corner2 = box.corner2;
        const length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        const width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        console.log("Debugging l*w:", length*width, "< 129499");
    });*/

    const newArr = arr.filter((box) => {
        const { corner1, corner2 } = box;
        const length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        const width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        return length * width !== 0;
    });

    return newArr;
}

const genSegmentObj = (latLngArr) => {
    // returns an object with int keys and a corner1 and corner2 attribute which then contains 
    // latlngs for a bounding box. The bounding box is the fewest number of < 50k square mile segments.

    let result = [];
    const kmSq = 129499;
    let tempArr = latLngArr;
    let corner1, corner2, length, width, i, prev = 0;

    // initial check: assert origin to destination is under 50,000 sq miles.
    const origin = tempArr[0];
    const dest = tempArr[tempArr.length-1];
    const firstl = getDistance(origin, { lat: origin.lat, lng: dest.lng }) / 1000;
    const firstw = getDistance(dest, { lat: origin.lat, lng: dest.lng }) / 1000;
    if (firstl*firstw <= kmSq) {
        return { 0: { corner1: origin, corner2: dest } };
    }
    try {
        while (tempArr.length !== 0) {
            corner1 = tempArr.shift(); // shift shortest corner out from front index
            for (i = 0; i < tempArr.length; i++) {
                corner2 = tempArr[i];
                length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
                width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;
                // console.log("debug: l*w:", length*width, "< 129499");
                if (length*width > kmSq) {
                    // console.log("debug: l*w exceeded:", length*width, "< 129499");
                    // dlength and dwidth ensure that the prev value * current value is valid, or else
                    // the algorithm will end prematurely with invalid values.
                    // if dlength * dwidth > kmSq, then the algorithm will skip that bounding box entirely.
                    const dlength = getDistance(corner1, { lat: corner1.lat, lng: tempArr[prev].lng}) / 1000;
                    const dwidth = getDistance(tempArr[prev], { lat: corner1.lat, lng: tempArr[prev].lng }) / 1000;
                    if (dlength*dwidth > kmSq) {
                        // console.log("debug: dl*dw exceeded:", dlength*dwidth, "< 129499");
                        corner1 = tempArr.shift(); // overwrite old corner1
                        corner2 = corner1; 
                        // previous corner2 overwritten, don't need.
                        // The next iteration area will be 0 for dlength and dwidth
                    } else {
                        // console.log("debug2: l*w should not exceed:", dlength*dwidth, "< 129499");
                        corner2 = tempArr[prev];
                        break;
                    }
                }
                prev = i;
            }
            result.push({ corner1, corner2 })
            tempArr = tempArr.slice(i-1); // retain all bigger data and remove smaller data
        }
        result = assertSquareMiles(result);

        return {...result};
    } catch(err) {
        console.log(err);
        return {};
    }
}

const genSegmentObjForAllRoutes = (data) => {
    // returns an object containing the segmented areas for every route.
    // { 0: {segment object}, 1: ... }
    let result = [];
    for (let routeNum in data) {
        const fullRouteLatLngArr = genLatLngQueue(data[routeNum]);
        const routeSegmentObj = genSegmentObj(fullRouteLatLngArr);
        result.push(routeSegmentObj);
    }
    return {...result};
}

export const updateFullIncidentState = (data, callback) => {
    // given object returned by genSegmentObj, fire actions for every single possible segement
    // in every route
    // callback will be the fetchIncidents action creator.
    const fullSegmentObj = genSegmentObjForAllRoutes(data);
    for (let routeNum in fullSegmentObj) {
        for (let stepNum in fullSegmentObj[routeNum]) {
            // send the entire latlng array into the action,
            // where the reducer will do the calculations to filter incidents!
            callback(routeNum, stepNum, fullSegmentObj[routeNum][stepNum], genUniqueLatLngQueue(data[routeNum]));
        }
    }
}
