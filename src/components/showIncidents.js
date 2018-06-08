import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import NavBar from "./navBar.js";
import { IncidentPolylineMap } from "./showMap.js";
import { updateFullIncidentState } from "../logic/incidentLogic.js";
import { fetchIncidents } from "../actions/actionTypes";
// import { formValueSelector } from "redux-form";
import { Tabs, Tab, Panel, ListGroup, ListGroupItem, Alert, Label, PageHeader, Jumbotron } from "react-bootstrap";
import "./showIncidents.css";
import banner from "../assets/incidents_banner.gif";

// TODO: add button to refresh page, or perhaps add componentDidUpdate with the same code as didMount?
// Add a LEGEND displaying what each marker on the google maps means.

const checkType = (num) => {
    switch(num) {
        case 1: return (<Label bsStyle="info">Construction</Label>);
        case 2: return (<Label bsStyle="info">Event</Label>);
        case 3: return (<Label bsStyle="info">Congestion</Label>);
        default: return (<Label bsStyle="primary">Incident</Label>);
    }
}

const checkSeverity = (num) => {
    switch(num) {
        case 1: return (<Label bsStyle="success">Severity: Low</Label>);
        case 2: return (<Label bsStyle="default">Severity: Moderate</Label>);
        case 3: return (<Label bsStyle="warning">Severity: High</Label>);
        default: return (<Label bsStyle="danger">Severity: Very High</Label>);
    }
}

const checkImpacting = (bool) => {
    if (bool) { return (<Label bsStyle="warning">Impacting Traffic</Label>); }
    return (null);
}

class ShowIncidents extends Component {

    componentDidMount() {
        if (!_.isEmpty(this.props.directionData) && _.isEmpty(this.props.incidentsData)) {
            if (this.props.searchParameters.travelMode === "driving") {
                updateFullIncidentState(this.props.directionData, this.props.fetchIncidents);
            } else {
                console.log("travelMode was not set to driving, so will not search incidents.");
                // console.log("travelMode is currently", this.props.isDriving);
            }
        }
    }

    generateIncidents(incidentArray) {
        // given an array of incidents from this.props.incidentsData, generate a list
        let key = 0;
        const listGroupItemArr = incidentArray.map(
            (incident) => {
                const { shortDesc, type, severity, impacting } = incident;
                const typeStyle = checkType(type);
                const severityStyle = checkSeverity(severity);
                const impactStyle = checkImpacting(impacting);
                return (
                    <ListGroupItem key={key++} header={shortDesc}>{typeStyle}{' '}{severityStyle}{' '}{impactStyle}</ListGroupItem>
                );
            }
        );
        if (listGroupItemArr.length !== 0) {
            return (
                <ListGroup>
                    {listGroupItemArr}
                </ListGroup>
            );
        } else {
            return (
                <div>
                    <Alert bsStyle="info">
                        <strong>Good news!</strong> There aren't any weird incidents you need to look out for.
                    </Alert>
                </div>
            );
        }
    }

    generateTabs() {
        let key = -1; // first key begins at 0
        const tabContents = _.map(this.props.incidentsData, (route) => {
            key++;
            return (
                <Tab key={key} eventKey={key} title={`Route ${key+1}`}>
                    <PageHeader>Incident Visualization</PageHeader>
                    <IncidentPolylineMap 
                    overviewPolyline={this.props.directionData[key]["overview_polyline"]["points"]} 
                    routeBounds={this.props.directionData[key]["bounds"]}
                    incidentsArray={route} />
                    <PageHeader>Route Incidents</PageHeader>
                    {this.generateIncidents(route)}
                </Tab>
            );
        });
        return (
            <Tabs defaultActiveKey={0} id="IncidentsTabs">
                {tabContents}
             </Tabs>
        );
    }

    render() {
        if (_.isEmpty(this.props.incidentsData)) {
            if (this.props.searchParameters.travelMode && this.props.searchParameters.travelMode !== "driving") {
                return (
                    <div>
                        <NavBar />
                        <Alert bsStyle="info">
                            <strong>No Info Found...</strong> You can only view traffic incidents if you are driving.
                        </Alert>
                    </div>
                );
                
            } else {
                return (
                    <div>
                        <NavBar />
                        <Alert bsStyle="warning">
                            <strong>No Info Found...</strong> Looks like you haven't searched anything, your search was invalid, or the page needs to be refreshed.
                        </Alert>
                    </div>
                );
            }
        }
        console.log("showIncidents render():", this.props.incidentsData);
        const { originInput, destinationInput } = this.props.searchParameters;
        let incidentsCount = 0;
        for (let i in this.props.incidentsData) {
            incidentsCount += this.props.incidentsData[i].length;
        }
        const jumboStyle = {
            backgroundImage: `linear-gradient(rgba(46, 43, 43, 0.4), rgba(20, 35, 62, 0.4)), url(${banner})`,
            backgroundPosition: "50% 75%",
            backgroundSize: "cover",
            textAlign: "center"
        }
        const textStyle = {
            color: "white"
        }
        return (
            <div>
                <NavBar/>
                <Panel className="Incidents-body">
                    <Jumbotron style={jumboStyle} > 
                        <h1 style={textStyle}>Route Incidents</h1>
                        <p style={textStyle}>
                            Found {incidentsCount} total incidents in all routes from {originInput} to {destinationInput}.
                        </p>
                    </Jumbotron>
                    <Panel.Body> 
                        {this.generateTabs()}
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // const selector = formValueSelector("SearchInputForm");
    return { 
        directionData: state.directionData, 
        incidentsData: state.incidentsData,
        searchParameters: state.searchParameters,
        // isDriving: selector(state, "travelMode")
    };
}

// reducer incomplete so cannot use action creator yet.
export default connect(mapStateToProps, { fetchIncidents })(ShowIncidents);