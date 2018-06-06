import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import NavBar from "./navBar.js";
import SearchInputPlaces from "./searchInputPlaces";
import { Well, Button, ListGroup, ListGroupItem, Panel } from "react-bootstrap";
import { fetchMorePlaces } from "../actions/actionTypes";

// TODO:
// ui: looking for places near {destination name}
// Render places list and filter search bar using componentDidUpdate
// render detailed info component

// add pagetoken action to concatenate new page results into the array (infinite scrolling) see api

class ShowPlaces extends Component {

    renderPageResults(resultArr) {
        // given 2d array of results, renders the results as a list based on page number
        let key = 0;
        const listGroupItemArr = resultArr.map(
            (place) => {
                return (
                    <ListGroupItem key={key++} header={place.name}>Located at {place.vicinity}</ListGroupItem>
                );
            }
        );
        return (
            <ListGroup>
                {listGroupItemArr}
            </ListGroup>
        );
        // return(<div> Debugging </div>);
    }

    render() {
        if (_.isEmpty(this.props.directionData)) {
            // search not yet occurred for directions
            return (
                <div>
                    <NavBar />
                </div>
            );
        }
        console.log("placesData:",this.props.placesData);
        // if results exists but [[]] length is zero means no results found
        // if (_.isEmpty(this.props.placesData)) {
        //     // search not yet occurred for places
        //     return (
        //         <div><NavBar /><Well><SearchInputPlaces /></Well></div>
        //     );
        // } else 
        if (this.props.placesData.results && this.props.placesData.results.length > 0) {
            // search occurred and there was at least 1 result returned in the first nested array
            // onClick disables because nextPageToken does not exist even though the index does
            return (
                <div><NavBar /><Well><SearchInputPlaces /></Well>
                    <Panel><Panel.Body>
                    Render searchbar filter here
                    {this.renderPageResults(this.props.placesData.results)}
                    <Button disabled={ this.props.placesData.nextPageToken ? false : true }
                    onClick={() => this.props.fetchMorePlaces(this.props.placesData.nextPageToken)}>Show More</Button>
                    </Panel.Body></Panel>
                </div>
            );
        } else if (this.props.placesData.results && this.props.placesData.results.length === 0) {
            // search made, but no results returned
            return (
                <div>
                    <NavBar /><Well><SearchInputPlaces /></Well>
                    Return alert here: no results found!
                </div>
            );

        } else {
            // search not yet made for places
            return (
                <div><NavBar /><Well><SearchInputPlaces /></Well></div>
            );
        }
        // render filter location button here using autosuggest
        // render list down here, and show more results button on the bottom.
    }
}

function mapStateToProps(state) {
    return { directionData: state.directionData, placesData: state.placesData } // did not link up placesData state yet
}

export default connect(mapStateToProps, { fetchMorePlaces })(ShowPlaces);