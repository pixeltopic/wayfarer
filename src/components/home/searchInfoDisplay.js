import React from "react";
import { Jumbotron, Table, ButtonGroup, Button } from "react-bootstrap";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import banner from "../../assets/app_info.gif";
import "../../style/searchInfoDisplay.css";

const calcAvgDistance = (unit, distanceValues) => {
    // distanceValues is an array of meter values.
    if (!distanceValues) {
        return; // in case distances are all unknown or not present
    }
    let total = 0;
    if (unit === "imperial") {
        // default values are always in meters, convert to miles
        distanceValues.forEach(dist => total += dist);
        return Math.round((total / distanceValues.length) / 1609*100 )/100;
    } else {
        // returns average km
        distanceValues.forEach(dist => total += dist);
        return Math.round((total / distanceValues.length) / 1000*100 )/100;
    }
}

const calcAvgTime = (timeValues) => {
    // timeValues is an array of times in seconds.
    if (!timeValues) {
        return; // in case times are all unknown or not present
    }
    let total = 0;
    for (let i = 0; i < timeValues.length; i++) {
        total += timeValues[i];
    }
    return Math.round(total / timeValues.length / 60*100)/100; // round it
}

const extractTimes = (directionData) => {
    // returns an array of times
    return _.map(directionData, directionObj => {
        if(directionObj["legs"]["0"]["duration"] && directionObj["legs"]["0"]["duration"].value)
            return directionObj["legs"]["0"]["duration"].value;
    });
}

const extractDistances = (directionData) => {
    // returns an array of distances
    return _.map(directionData, directionObj => {
        if(directionObj["legs"]["0"]["distance"] && directionObj["legs"]["0"]["distance"].value)
            return directionObj["legs"]["0"]["distance"].value;
    });
}

const createAvoidStr = (avoidObj) => {
    let str = "";
    if (avoidObj.avoidTolls) str += "Tolls, ";
    if (avoidObj.avoidHighways) str += "Highways, ";
    if (avoidObj.avoidFerries) str += "Ferries, ";
    if (avoidObj.avoidIndoor) str += "Indoor, ";
    return str !== "" ? str.substring(0, str.length-2) : "";
}

// Must use withRouter HOC when no access to history.
const RouterButton = withRouter(
    (props) => (<Button onClick={
        () => { 
            props.history.push(props.redirectTo);
            window.scrollTo(0, 0);
        }
    }>{props.buttonText}</Button>)
);

export default (props) => {
    // given travel mode, origin, destination from directionData render some general info
    const routeCount = Object.getOwnPropertyNames(props.directionData).length;

    const jumboStyle = {
        backgroundImage: `linear-gradient(rgba(46, 43, 43, 0.7), rgba(20, 35, 62, 0.7)), url(${banner})`,
        backgroundPosition: "50% 55%",
        backgroundSize: "cover",
        textAlign: "center",
        boxShadow: "3px 3px 3px 1px rgba(0, 0, 0, .6)"
    }

    return (
        <div style={{color : "white"}}>
            <Jumbotron style={jumboStyle}>
                <h3 
                style={{ padding: "15px 0 15px 0" }}
                >You searched for {routeCount > 1 ? "" : "a"} {props.travelMode} {routeCount > 1 ? "routes" : "route"} from {props.origin} to {props.destination}.</h3>
                <Table className="table-borderless" responsive style={{ padding: "5px 5px 5px 5px" }}>
                    <tbody>
                        <tr>
                            <td>Routes Found</td><td>{routeCount} {routeCount === 1 ? "route found" : "routes found" }</td>
                        </tr>
                        { extractTimes(props.directionData)[0] ? <tr>
                            <td>{routeCount===1 ? "Travel Time" : "Avg Travel Time"}</td><td>{calcAvgTime(extractTimes(props.directionData))} minutes</td>
                        </tr> : null}
                        { extractDistances(props.directionData)[0] ? <tr>
                            <td>{routeCount===1 ? "Travel Distance" : "Avg Travel Distance"}</td><td>{calcAvgDistance(props.unit, extractDistances(props.directionData))} {props.unit === "imperial" ? "miles" : "kilometers"}</td>
                        </tr> : null}
                        { createAvoidStr(props.avoid) !== "" ? <tr>
                            <td>Avoiding on Route</td><td>{ createAvoidStr(props.avoid) }</td>
                        </tr> : null}
                    </tbody>
                </Table>
                <ButtonGroup style={{ color : "white" }}>
                    <RouterButton buttonText="Get Directions" redirectTo={"/directions"} />
                    <RouterButton buttonText="Find Incidents" redirectTo={"/Incidents"} />
                    <RouterButton buttonText="Search Places" redirectTo={"/places"} />
                </ButtonGroup>
            </Jumbotron>

        </div>
    );
}