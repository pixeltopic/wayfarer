import React, { Component } from 'react';
import { Well, Jumbotron, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import _ from "lodash";

import SearchInput from "./searchInput";
import SearchInfoDisplay from "./searchInfoDisplay";
import NavBar from "../common/navBar";
import FooterBar from "../common/footerBar";
import logo from "../../assets/bonfire_logo.gif";
import banner from "../../assets/app_info2.gif";
import "../../style/App.css";

// cd C:\Users\xmobl\Documents\GitRepos\wayfarer

/*
LEGACY TODO:
searchInput Form info - REQUIRED:
origin/destination=input
travel mode=drop down menu (driving, bicycling, walking, transit)
OPTIONAL:
alternatives=checkmark (true or false for alternate routes) if it's false, don't even bother creating
a url str
avoid=checklist of things to avoid (tolls, highways, ferries, indoor if walking) does not guarantee avoidance
MAKE SURE TO VALIDATE INDOOR IF WALKING
can specify multiple avoids in URL by using | to divide
units=dropdown (metric or imperial, imperial by default)

Example URL with all 6 parameters used:
https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&avoid=highways&mode=bicycling&alternatives=true&units=imperial&key=

NEW TODO:
Add footer to every page
Make place list pretty
Add distance/time info to showDirections
*/

class App extends Component {
    render() {
        const jumboStyle = {
            backgroundImage: `linear-gradient(rgba(46, 43, 43, 0.4), rgba(20, 35, 62, 0.4)), url(${banner})`,
            backgroundPosition: "50% 55%",
            backgroundSize: "cover",
            textAlign: "center",
            boxShadow: "3px 3px 3px 1px rgba(0, 0, 0, .6)"
        }
        const { originInput, destinationInput, travelMode, unit, avoidFerries, avoidHighways, avoidTolls, avoidIndoor } = this.props.searchParameters;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Wayfarer</h1>
                </header>
                <div>
                    <NavBar />
                    <div className="App-body">
                        <Jumbotron style={jumboStyle}>
                            <h3 style={{ color: "white"}}>Wayfarer is a web app that finds directions, incidents, and places of interest.</h3>
                        </Jumbotron>
                        <Well>
                            <SearchInput />
                        </Well>
                        { _.isEmpty(this.props.searchParameters) || _.isEmpty(this.props.directionData) 
                            ? <Alert bsStyle="warning"><strong>Looks like you haven't searched for anything yet, or your search didn't find anything.</strong></Alert> 
                            : <Alert bsStyle="success"><strong>Search Successful!</strong> Some general info for your search displayed below.</Alert> }
                        { _.isEmpty(this.props.searchParameters) || _.isEmpty(this.props.directionData) 
                            ? null
                            : <SearchInfoDisplay 
                            directionData={this.props.directionData} 
                            travelMode={travelMode} 
                            origin={originInput} 
                            destination={destinationInput} 
                            unit={unit}
                            avoid={{avoidTolls, avoidHighways, avoidFerries, avoidIndoor}} />
                             }
                    </div>
                </div>
                <FooterBar />
            </div>
         );
    }
}

function mapStateToProps(state) {
    return {
        searchParameters : state.searchParameters,
        directionData : state.directionData
    }
}

export default connect(mapStateToProps)(App);
