import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import NavBar from "./navBar.js";
import SearchInputPlaces from "./searchInputPlaces";
import { Well } from "react-bootstrap";

// TODO:
// ui: looking for places near {destination name}
// Render places list and filter search bar using componentDidUpdate
// render detailed info component

// add pagetoken action to concatenate new page results into the array (infinite scrolling) see api

class ShowPlaces extends Component {
    render() {
        if (_.isEmpty(this.props.directionData)) {
            return (
                <div>
                    <NavBar />
                </div>
            );
        }
        console.log("placesData:",this.props.placesData);
        // console.log(this.props.directionData);
        return (
            <div>
                <NavBar />
                <Well><SearchInputPlaces /></Well>
            </div>
        );
        // render filter location button here using autosuggest
        // render list down here, and show more results button on the bottom.
    }
}

function mapStateToProps(state) {
    return { directionData: state.directionData, placesData: state.placesData } // did not link up placesData state yet
}

export default connect(mapStateToProps)(ShowPlaces);