import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import NavBar from "./navBar.js";
import { updateFullIncidentState } from "../logic/incidentLogic.js";
import { fetchIncidents } from "../actions/actionTypes";
import { formValueSelector } from "redux-form";
// import { getDistance } from "geolib";

// TODO: add button to refresh page, or perhaps add componentDidUpdate with the same code as didMount?

class ShowIncidents extends Component {

    componentDidMount() {
        if (!_.isEmpty(this.props.directionData) && _.isEmpty(this.props.incidentsData)) {
            if (this.props.isDriving === "driving") {
                updateFullIncidentState(this.props.directionData, this.props.fetchIncidents);
            } else {
                console.log("travelMode was not set to driving, so will not search incidents.")
                console.log("travelMode is currently", this.props.isDriving);
            }
        }
    }

    render() {
        if ( !_.isEmpty(this.props.incidentsData)) {
            console.log("showIncidents render():", this.props.incidentsData);
        }
        return (<div>
            <NavBar/>
            Blah blah
            </div>);
    }
}

function mapStateToProps(state) {
    const selector = formValueSelector("SearchInputForm");
    return { 
        directionData: state.directionData, 
        incidentsData: state.incidentsData,
        isDriving: selector(state, "travelMode")
    };
}

// reducer incomplete so cannot use action creator yet.
export default connect(mapStateToProps, { fetchIncidents })(ShowIncidents);