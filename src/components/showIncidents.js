import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import NavBar from "./navBar.js";
import { genLatLngQueue, genSegmentObj } from "../logic/incidentLogic.js";
import { fetchIncidents } from "../actions/actionTypes";
// import { getDistance } from "geolib";

// TODO: create algorithm to clean up data.

class ShowIncidents extends Component {

    componentDidMount() {
        if (!_.isEmpty(this.props.directionData) && _.isEmpty(this.props.incidentsData)) {
            // if (this.props.directionData) is DRIVING, THEN do this.
            // console.log to make sure it won't infinite loop if it's driving.
            this.updateFullIncidentState(this.props.directionData);
        }
    }

    genSegmentObjForAllRoutes(data) {
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

    updateFullIncidentState(data) {
        // given object returned by genSegmentObj, fire actions for every single possible segement
        // in every route
        const fullSegmentObj = this.genSegmentObjForAllRoutes(data);
        for (let routeNum in fullSegmentObj) {
            for (let stepNum in fullSegmentObj[routeNum]) {
                this.props.fetchIncidents(routeNum, stepNum, fullSegmentObj[routeNum][stepNum]);
            }
        }
    }

    render() {
        // if (!_.isEmpty(this.props.directionData) && _.isEmpty(this.props.incidentsData)) {
            
        //     // if (this.props.directionData) is DRIVING, THEN do this. actually, use SHowDirections formselector travelmode === driving
        //     // console.log to make sure it won't infinite loop if it's driving.
        //     this.updateFullIncidentState(this.props.directionData);
        // }
        if ( !_.isEmpty(this.props.incidentsData)) {
            console.log(this.props.incidentsData);
        }
        return (<div>
            <NavBar/>
            Blah blah
            </div>);
    }
}

function mapStateToProps(state) {
    return { directionData: state.directionData, incidentsData: state.incidentsData };
}

// reducer incomplete so cannot use action creator yet.
export default connect(mapStateToProps, { fetchIncidents })(ShowIncidents);