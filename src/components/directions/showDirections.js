import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
// import { formValueSelector } from "redux-form";
import { Tabs, Tab, Panel, ListGroup, ListGroupItem, Alert, PageHeader, Jumbotron } from "react-bootstrap";

import NavBar from "../common/navBar";
import { PolylineMap } from "../common/showMap";
import "../../style/showDirections.css";
import banner from "../../assets/direction_banner.gif";

class ShowDirections extends Component {

    generateSteps(stepArr) {
        // given an array of steps, creates a list with properly formatted directions/distance/time
        // result of this function will be the data of a tab.
        let key = 0; // first key starts at 0
        const listContents = stepArr.map(
            (step) => {
                const dist = step.distance.text;
                const dur = step.duration.text;
                const instructions = step.html_instructions.replace(/<\/?b>/g, "").replace(/<\/?div>/g, "").replace(/&nbsp;/g, "").replace(/<div style="font-size:0\.9em">/g, ", ").replace(/&amp;/g, "&");
                
                return (
                    <ListGroupItem key={key++} header={instructions}>{dist}, {dur}</ListGroupItem>
                );
            }
        );
        return (
            <ListGroup>
                {listContents}
            </ListGroup>
        );

    }

    generateTabs() {
        // for (let routenum in this.props.directionData) {
        //     console.log(this.props.directionData[routenum]);
        // }
        let key = -1; // first key begins at 0
        const tabContents = _.map(this.props.directionData, (route) => {
            key++;
            return (
                <Tab key={key} eventKey={key} title={`Route ${key+1}`}>
                    <PageHeader>Route Visualization</PageHeader>
                    <PolylineMap overviewPolyline={route.overview_polyline.points} routeBounds={route.bounds}/>
                    <PageHeader>Route Directions</PageHeader>
                    {this.generateSteps(route["legs"]["0"]["steps"])}
                </Tab>
            );
        });

        // route["legs"]["0"][xxx] to access start/end addr, distance, time and stuff
        // TO DO:
        // add primary route information above the list (addr, distance, time, etc)
        return (
            <Tabs defaultActiveKey={0} id="DirectionTabs">
                {tabContents}
             </Tabs>
        );
    }

    render() {
        console.log(this.props.directionData);
        if (_.isEmpty(this.props.directionData)) {
            return (
                <div>
                    <NavBar />
                    <Alert bsStyle="warning">
                        <strong>No Info Found...</strong> Looks like you haven't searched anything, or your search was invalid.
                    </Alert>
                </div>
            );
        }
        const routeCount = Object.getOwnPropertyNames(this.props.directionData).length;
        const { originInput, destinationInput } = this.props.searchParameters;
        const jumboStyle = {
            backgroundImage: `linear-gradient(rgba(46, 43, 43, 0.4), rgba(20, 35, 62, 0.4)), url(${banner})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            textAlign: "center"
        }
        const textStyle = {
            color: "white"
        }
        return (
            <div>
                <NavBar />
                <Panel className="Direction-body">
                    <Jumbotron style={jumboStyle} > 
                        <h1 style={textStyle}>Route Directions</h1>
                        <p style={textStyle}>
                            Looking for {routeCount} {routeCount === 1 ? "route" : "routes"} from {originInput} to {destinationInput}.
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
    return { directionData: state.directionData, searchParameters: state.searchParameters };
    // return { directionData: state.directionData, 
        // originInput: selector(state, "originInput"), 
        // destinationInput: selector(state, "destinationInput") };
}

// second parameter of connect is mapDispatchToProps
export default connect(mapStateToProps)(ShowDirections);