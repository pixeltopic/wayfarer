import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import ShowDirections from "./components/show_directions.js";
import SearchInput from "./components/search_input";
import NavBar from "./components/nav_bar";

// import { Link } from "react-router-dom";
import { Well } from "react-bootstrap";

// cd C:\Users\xmobl\Documents\GitRepos\wayfarer

/*
TODO:

study google maps API and decide how to construct a redux-form component

FORM PARAMETERS:
form possible inputs (construct a URL based on which parameters are specified, since some are optional)

REQUIRED:
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

TODO AFTER REDUX FORM:
study mapquest and openweather api for any possible changes to form for those to work

MAPQUEST PARAM:
Requires LATLONG of Location 1 and 2, combine those into a bounding box!
eg boundingBox=39.95,-105.25,39.52,-104.71
boundingBox=LAT1,LNG1,LAT2,LNG2

How to get bounds? on [routes][number], access [bounds] and piece together the latlongs!
*/

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Wayfarer</h1>
                </header>
                <div>
                    <NavBar/>
                    <Well>
                        <SearchInput />
                    </Well> 
                </div>
            </div>
         );
    }
}

export default App;
