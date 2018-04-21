import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchDirections } from "../actions/actionTypes";
import { formValueSelector } from "redux-form";
import { Tabs, Tab, Panel, ListGroup, ListGroupItem } from "react-bootstrap";

// This component displays the STEPS from origin to destination.
class ShowDirections extends Component {
    // componentDidMount() {
    //     this.props.fetchDirections();
    // }

    generateSteps(stepArr) {
        // given an array of steps, creates a list with properly formatted directions/distance/time
        // result of this function will be the data of a tab.
        let key = -1; // first key starts at 0
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

        for (let routenum in this.props.googleData) {
            console.log(this.props.googleData[routenum]);
        }
        let key = -1; // first key begins at 0
        const tabContents = _.map(this.props.googleData, (route) => {
            key++;
            return (
                <Tab key={key} eventKey={key} title={`Route ${key+1}`}>
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
        console.log(this.props.googleData);
        if (_.isEmpty(this.props.googleData)) {
            console.log("Flagged"); // put some prettier error message here later
            return <div/>;
        }
        //this.generateTabs();
        //console.log(this.props.originInput, ">>", this.props.destinationInput);
        return (
            <div>
                <Panel>
                    <Panel.Body> 
                        {this.generateTabs()}
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //const selector = formValueSelector("SearchInputForm");
    return { googleData: state.googleData };
    //return { googleData: state.googleData, originInput: selector(state, "originInput"), 
    //destinationInput: selector(state, "destinationInput") };
}

// second parameter of connect is mapDispatchToProps
export default connect(mapStateToProps, { fetchDirections })(ShowDirections);