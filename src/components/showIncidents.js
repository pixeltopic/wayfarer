import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { genLatLngQueue, genSegmentObj } from "../logic/incidentLogic.js";
import { fetchIncidents } from "../actions/actionTypes";
// import { getDistance } from "geolib";


// important limitation:
// only use this class if travel method is driving. this should be handled via conditional on searchInput.js
class ShowIncidents extends Component {

    filterLatLongs() {
        // using direction data provided by google maps, create an array of latlongs and return an array
        // of lat long objects for MapQuest API calls.

        const data = this.props.directionData;
        // const calcTest = genLatLngQueue(data["0"]);

        // const corner1 = { lat: 38.644259, lng: -121.378 };
        // const corner2 = { lat: 40.725200, lng: -111.90465 };

        // const length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng }) / 1000;
        // const width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng }) / 1000;

        // console.log("debug: l*w:", length*width, "< 129499");
        // console.log("corner1:",corner1);
        // console.log("corner2:",corner2);
        // console.log("corner3:", { lat: corner1.lat, lng: corner2.lng });
        // console.log("len/wid:", length, width);

        for (let routeNum in data) {
            const calcTest = genLatLngQueue(data[routeNum]);
            console.log(calcTest);
            console.log(genSegmentObj(calcTest));
        }

    }

    genSegmentObjForAllRoutes() {
        // returns an object containing the segmented areas for every route.
        // { 0: {segment object}, 1: ... }
        const data = this.props.directionData;
        let result = [];
        for (let routeNum in data) {
            const fullRouteLatLngArr = genLatLngQueue(data[routeNum]);
            const routeSegmentObj = genSegmentObj(fullRouteLatLngArr);
            result.push(routeSegmentObj);
        }
        return {...result};
    }

    updateFullIncidentState() {
        // given object returned by genSegmentObj, fire actions for every single possible segement
        // in every route
        const fullSegmentObj = this.genSegmentObjForAllRoutes();
        for (let routeNum in fullSegmentObj) {
            for (let stepNum in fullSegmentObj[routeNum]) {
                this.props.fetchIncidents(routeNum, stepNum, fullSegmentObj[routeNum][stepNum]);
            }
        }
    }

    // fetchSingleSegmentData(routeNum, stepNum, segObj) {
        
    //     console.log("WIP");
    // }

    render() {
        if (!_.isEmpty(this.props.directionData)) {
            
            // const fullobj = this.genSegmentObjForAllRoutes();
            // console.log(fullobj);
            this.updateFullIncidentState();

        }
        return <div />
    }
}

function mapStateToProps(state) {
    return { directionData: state.directionData };
}

// reducer incomplete so cannot use action creator yet.
export default connect(mapStateToProps, { fetchIncidents })(ShowIncidents);