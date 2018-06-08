import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import NavBar from "./navBar.js";
import SearchInputPlaces from "./searchInputPlaces";
import { Well, Button, ListGroup, ListGroupItem, Panel, Alert, Jumbotron } from "react-bootstrap";
import { fetchMorePlaces } from "../actions/actionTypes";
import FilterPlaces from "./filterPlaces.js";
import { formValueSelector } from "redux-form";
import "./showPlaces.css";
import banner from "../assets/places_banner.gif";

// TODO:
// ui: looking for places near {destination name}
// render detailed info component. create button with new component in each ListGroupItem, pass props in

// add x distance away from destination info

class ShowPlaces extends Component {

    filterPageResults(resultArr, phrase) {
        // given the results array, filters out text based on phrase
        if (phrase && phrase.toString().replace(/ /g,"").length !== 0) {
            return resultArr.filter(
                place => place.name.toString().toLowerCase() === phrase.toString().toLowerCase());
        } else {
            return resultArr;
        }
    }

    renderPageResults(resultArr) {
        // given the results array, renders the results as a list
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
    }

    render() {
        if (_.isEmpty(this.props.directionData)) {
            // search not yet occurred for directions
            return (
                <div >
                    <NavBar />
                    <Alert bsStyle="warning">
                        <strong>No Info Found...</strong> Looks like you haven't searched any routes, your search was invalid, or the page needs to be refreshed.
                    </Alert>
                </div>
            );
        }
        console.log("placesData:",this.props.placesData);

        const jumboStyle = {
            backgroundImage: `linear-gradient(rgba(46, 43, 43, 0.4), rgba(20, 35, 62, 0.4)), url(${banner})`,
            backgroundPosition: "50% 85%",
            backgroundSize: "cover",
            textAlign: "center",
            boxShadow: "3px 3px 3px 1px rgba(0, 0, 0, .6)"
        }
        const textStyle = {
            color: "white"
        }
        
        if (this.props.placesData.results && this.props.placesData.results.length > 0) {
            return (
                <div>
                    <NavBar />
                    <div className="Places-body">
                        <Jumbotron style={jumboStyle} > 
                            <h1 style={textStyle}>Places Search</h1>
                            <p style={textStyle}>
                                Found {this.props.placesData.results.length} locations near {this.props.searchParameters.destinationInput}.
                            </p>
                        </Jumbotron>
                        <Well><SearchInputPlaces /></Well>
                        <Panel><Panel.Body>
                        <FilterPlaces />
                        {this.renderPageResults(this.filterPageResults(this.props.placesData.results, this.props.filterInput))}
                        <Button disabled={ this.props.placesData.nextPageToken ? false : true }
                        onClick={() => this.props.fetchMorePlaces(this.props.placesData.nextPageToken)}>Show More</Button>
                        </Panel.Body></Panel>
                    </div>
                </div>
            );
        } else if (this.props.placesData.results && this.props.placesData.results.length === 0) {
            // search made, but no results returned
            return (
                <div>
                    <NavBar />
                    <div className="Places-body">
                        <Jumbotron style={jumboStyle} > 
                            <h1 style={textStyle}>Places Search</h1>
                            <p style={textStyle}>
                                Found {this.props.placesData.results.length} locations near {this.props.searchParameters.destinationInput}.
                            </p>
                        </Jumbotron>
                        <Well><SearchInputPlaces /></Well>
                        <Alert bsStyle="warning">
                            <strong>No Info Found...</strong> No places were found that matched your query.
                        </Alert>
                    </div>
                </div>
            );

        } else {
            // search not yet made for places
            return (
                <div>
                    <NavBar />
                    <div className="Places-body">
                        <Jumbotron style={jumboStyle} > 
                            <h1 style={textStyle}>Places Search</h1>
                            <p style={textStyle}>
                                Looking for locations near {this.props.searchParameters.destinationInput}.
                            </p>
                        </Jumbotron>
                        <Well><SearchInputPlaces /></Well>
                        <Alert bsStyle="warning">
                            <strong>No Info Found...</strong> Looks like you haven't searched anything or your search was invalid.
                        </Alert>
                    </div>
                </div>
            );
        }
        // render filter location button here using autosuggest
        // render list down here, and show more results button on the bottom.
    }
}

function mapStateToProps(state) {
    const selector = formValueSelector("FilterPlacesForm");
    return { 
        directionData: state.directionData, 
        placesData: state.placesData,
        filterInput: selector(state, "filterInput"),
        searchParameters: state.searchParameters
    }
}

export default connect(mapStateToProps, { fetchMorePlaces })(ShowPlaces);