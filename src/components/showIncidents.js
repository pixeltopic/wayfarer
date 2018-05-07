import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { genLatLngQueue, genSegmentObj } from "../logic/incidentLogic.js";
// import { getDistance } from "geolib";


// important limitation:
// only use this class if travel method is driving. this should be handled via conditional on searchInput.js
class ShowIncidents extends Component {

    filterLatLongs() {
        // using direction data provided by google maps, create an array of latlongs and return an array
        // of lat long objects for MapQuest API calls.

        const data = this.props.directionData;
        // const calcTest = genLatLngQueue(data["0"]);

        // const corner1 = calcTest[0];
        // const corner2 = calcTest[calcTest.length-1];

        // const length = getDistance(corner1, { lat: corner1.lat, lng: corner2.lng });
        // const width = getDistance(corner2, { lat: corner1.lat, lng: corner2.lng });
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

    doSegmentObjAction(routeNum, segObj) {
        // given an object of valid segments, loop through and fire actions to the mapquest API.
        // if there were alternative routes calculated, make sure to account for those too.
        // right now there are no differentiation between objects.
        console.log("WIP");
    }

    render() {
        if (!_.isEmpty(this.props.directionData)) {
            this.filterLatLongs();
        }
        return <div />
    }
}

function mapStateToProps(state) {
    return { directionData: state.directionData };
}

export default connect(mapStateToProps)(ShowIncidents);