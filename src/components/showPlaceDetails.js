import React, { Component } from "react";
import { fetchPlaceDetails } from "../actions/actionTypes";
import { connect } from "react-redux";
import _ from "lodash";
import { Panel, Button, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";

class ShowPlaceDetails extends Component {
    // constructor(props) {
    //     super(props);
    //     this.key = props.key;
    //     this.locationID = props.locationID;
    // }

    render() {
        if (_.isEmpty(this.props.placeDetails)) {
            return (
                <div>
                    <Alert bsStyle="warning">
                        Not loading?
                        {" "}<Button onClick={() => this.props.history.push("/")} bsStyle="warning">Go back home.</Button>
                    </Alert>
                </div>
            );
        }
        console.log(this.props.placeDetails);

        // style a button later to programmatically navigate back
        return(
            <div>
                <Panel>
                    Some data here
                    {" "}<Button onClick={() => this.props.history.push("/places")}>Back</Button>
                </Panel>
            </div>
        );
    }


}

function mapStateToProps(state) {
    return { placeDetails : state.placeDetails }
}

export default connect(mapStateToProps, { fetchPlaceDetails })(ShowPlaceDetails);