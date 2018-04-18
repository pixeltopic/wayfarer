import React, { Component } from "react";
import { connect } from "react-redux";
// import _ from "lodash";
import { fetchDirections } from "../actions/actionTypes";
import { formValueSelector } from "redux-form";
import { Tabs, Tab, Panel } from "react-bootstrap";

// This component displays the STEPS from origin to destination.
class ShowDirections extends Component {
    // componentDidMount() {
    //     this.props.fetchDirections();
    // }

    generateTabs() {
        // if (this.props.googleData.length === 0) {
        //     return (
        //         <Tab eventKey={1} title="Tab 1">
        //             Tab 1 content
        //         </Tab>
        //     );
        // }

        for (let routenum in this.props.googleData) {
            console.log(this.props.googleData[routenum]);
        }
    }

    render() {
        console.log(this.props.googleData);
        this.generateTabs();
        //console.log(this.props.originInput, ">>", this.props.destinationInput);
        return (
            <div>
                <Panel>
                    <Panel.Body>
                        <Tabs defaultActiveKey={1} id="DirectionTabs">
                            <Tab eventKey={1} title="Tab 1">
                                Tab 1 content
                            </Tab>
                        </Tabs>
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