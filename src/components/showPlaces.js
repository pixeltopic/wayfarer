import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import NavBar from "./navBar.js";
import SearchInputPlaces from "./searchInputPlaces";
import { Well } from "react-bootstrap";

// TODO:
// Render places list and filter search bar using componentDidUpdate
// set up action creator and reducer
// render detailed info component

class ShowPlaces extends Component {
    render() {
        if (_.isEmpty(this.props.directionData)) {
            return (
                <div>
                    <NavBar />
                </div>
            );
        }
        return (
            <div>
                <NavBar />
                <Well><SearchInputPlaces /></Well>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { directionData: state.directionData }
}

export default connect(mapStateToProps)(ShowPlaces);